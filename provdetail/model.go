package provdetail

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/aiosk/covid19Idn/libs"
	"github.com/jordic/goics"
)

// Perkembangan ...
type Perkembangan struct {
	Date         int64 `json:"tanggal"`
	Death        int   `json:"MENINGGAL"`
	Active       int   `json:"DIRAWAT_OR_ISOLASI"`
	Recover      int   `json:"SEMBUH"`
	Case         int   `json:"KASUS"`
	TotalDeath   int   `json:"AKUMULASI_MENINGGAL"`
	TotalActive  int   `json:"AKUMULASI_DIRAWAT_OR_ISOLASI"`
	TotalRecover int   `json:"AKUMULASI_SEMBUH"`
	TotalCase    int   `json:"AKUMULASI_KASUS"`
}

// GetTag ...
func (v Perkembangan) GetTag(tag string) map[string]string {
	return libs.StructGetTag(v, tag)
}

// FileItem ...
type FileItem struct {
	Provinsi         string         `json:"provinsi"`
	ListPerkembangan []Perkembangan `json:"list_perkembangan"`
}

// GetTag ...
func (v FileItem) GetTag(tag string) map[string]string {
	return libs.StructGetTag(v, tag)
}

//File ...
type File []FileItem

// ToCsv ...
func (v File) ToCsv() [][]string {

	var dataCsv [][]string
	provDetailTags := v[0].GetTag("json")
	listPerkembanganTags := v[0].ListPerkembangan[0].GetTag("json")
	title := []string{
		provDetailTags["Provinsi"], listPerkembanganTags["Date"],
		listPerkembanganTags["TotalCase"], listPerkembanganTags["Case"],
		listPerkembanganTags["TotalRecover"], listPerkembanganTags["Recover"],
		listPerkembanganTags["TotalDeath"], listPerkembanganTags["Death"],
		listPerkembanganTags["TotalActive"], listPerkembanganTags["Active"],
	}
	dataCsv = append(dataCsv, title)
	for _, v := range v {
		for _, v2 := range v.ListPerkembangan {
			row := []string{
				v.Provinsi, libs.UnixToMyFormat(v2.Date),
				strconv.Itoa(v2.TotalCase), strconv.Itoa(v2.Case),
				strconv.Itoa(v2.TotalRecover), strconv.Itoa(v2.Recover),
				strconv.Itoa(v2.TotalDeath), strconv.Itoa(v2.Death),
				strconv.Itoa(v2.TotalActive), strconv.Itoa(v2.Active),
			}
			dataCsv = append(dataCsv, row)
		}
	}
	return dataCsv
}

// EmitICal ...
func (v File) EmitICal() goics.Componenter {

	cal := goics.NewComponent()
	cal.SetType("VCALENDAR")
	cal.AddProperty("CALSCAL", "GREGORIAN")
	cal.AddProperty("PRODID;X-RICAL-TZSOURCE=TZINFO", "-//tmpo.io")
	cal.AddProperty("SUMMARY", "Covid19 INDONESIA")

	for _, v2 := range v {
		for _, v3 := range v2.ListPerkembangan {

			event := goics.NewComponent()
			event.SetType("VEVENT")

			event.AddProperty("UID", fmt.Sprintf("%s-%s@covid19.go.id", strings.Replace(v2.Provinsi, " ", "_", -1), libs.UnixToMyFormat(v3.Date)))
			k4, v4 := goics.FormatDateField("DTEND", time.Unix(v3.Date/1000, 0))
			event.AddProperty(k4, v4)
			k4, v4 = goics.FormatDateField("DTSTART", time.Unix(v3.Date/1000, 0))
			event.AddProperty(k4, v4)
			event.AddProperty("X-FUNAMBOL-ALLDAY", "1")
			event.AddProperty("X-MICROSOFT-CDO-ALLDAYEVENT", "True")
			event.AddProperty("CLASS", "PUBLIC")
			desc := fmt.Sprintf(`%d(+%d) Cases
%d(+%d) Recovered Cases 
%d(+%d) Death Cases
%d(+%d) Active Cases`, v3.TotalCase, v3.Case,
				v3.TotalRecover, v3.Recover,
				v3.TotalDeath, v3.Death,
				v3.TotalActive, v3.Active,
			)
			event.AddProperty("DESCRIPTION", desc)
			event.AddProperty("SUMMARY", fmt.Sprintf("%s %d(+%d) Cases", v2.Provinsi, v3.TotalCase, v3.Case))
			event.AddProperty("URL", "covid19.go.id")
			event.AddProperty("CONTACT", "covid19.go.id")
			event.AddProperty("TRANSP", "TRANSPARENT")

			k4, v4 = goics.FormatDateTimeField("CREATED", time.Unix(v3.Date/1000, 0))
			event.AddProperty(k4, v4)
			k4, v4 = goics.FormatDateTimeField("LAST-MODIFIED", time.Unix(v3.Date/1000, 0))
			event.AddProperty(k4, v4)
			k4, v4 = goics.FormatDateTimeField("DTSTAMP", time.Unix(v3.Date/1000, 0))
			event.AddProperty(k4, v4)
			event.AddProperty("LOCATION", fmt.Sprintf("%s - Indonesia", v2.Provinsi))

			cal.AddComponent(event)
		}
	}

	return cal
}
