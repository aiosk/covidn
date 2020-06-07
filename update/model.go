package update

import (
	"fmt"
	"strconv"
	"time"

	"github.com/aiosk/covid19Idn/libs"
	"github.com/jordic/goics"
)

// HarianJumlah ...
type HarianJumlah struct {
	Value int `json:"value"`
}

// HarianItem ...
type HarianItem struct {
	Date         int64        `json:"key"`
	DateStr      string       `json:"key_as_string"`
	Death        HarianJumlah `json:"jumlah_meninggal"`
	Active       HarianJumlah `json:"jumlah_dirawat"`
	Recover      HarianJumlah `json:"jumlah_sembuh"`
	Case         HarianJumlah `json:"jumlah_positif"`
	TotalDeath   HarianJumlah `json:"jumlah_meninggal_kum"`
	TotalActive  HarianJumlah `json:"jumlah_dirawat_kum"`
	TotalRecover HarianJumlah `json:"jumlah_sembuh_kum"`
	TotalCase    HarianJumlah `json:"jumlah_positif_kum"`
}

// GetTag ...
func (v HarianItem) GetTag(tag string) map[string]string {
	return libs.StructGetTag(v, tag)
}

// HarianList ...
type HarianList []HarianItem

// SrcFile ...
type SrcFile struct {
	Update struct {
		Harian HarianList `json:"harian"`
	} `json:"update"`
}

// ToCsv ...
func (v HarianList) ToCsv() [][]string {
	var dataCsv [][]string
	tags := v[0].GetTag("json")
	title := []string{
		tags["DateStr"],
		tags["Death"], tags["Active"], tags["Recover"], tags["Case"],
		tags["TotalDeath"], tags["TotalActive"], tags["TotalRecover"], tags["TotalCase"],
	}
	dataCsv = append(dataCsv, title)

	for _, v := range v {
		// log.Printf("%+v\n", v)
		row := []string{
			v.DateStr[:10],
			strconv.Itoa(v.Death.Value), strconv.Itoa(v.Active.Value), strconv.Itoa(v.Recover.Value), strconv.Itoa(v.Case.Value),
			strconv.Itoa(v.TotalDeath.Value), strconv.Itoa(v.TotalActive.Value), strconv.Itoa(v.TotalRecover.Value), strconv.Itoa(v.TotalCase.Value),
		}
		dataCsv = append(dataCsv, row)
	}

	return dataCsv
}

// EmitICal ...
func (v HarianList) EmitICal() goics.Componenter {

	cal := goics.NewComponent()
	cal.SetType("VCALENDAR")
	cal.AddProperty("CALSCAL", "GREGORIAN")
	cal.AddProperty("PRODID;X-RICAL-TZSOURCE=TZINFO", "-//tmpo.io")
	cal.AddProperty("SUMMARY", "Covid19 INDONESIA")

	for _, v2 := range v {
		event := goics.NewComponent()
		event.SetType("VEVENT")

		event.AddProperty("UID", fmt.Sprintf("%s@covid19.go.id", libs.UnixToMyFormat(v2.Date)))
		k4, v4 := goics.FormatDateField("DTEND", time.Unix(v2.Date/1000, 0))
		event.AddProperty(k4, v4)
		k4, v4 = goics.FormatDateField("DTSTART", time.Unix(v2.Date/1000, 0))
		event.AddProperty(k4, v4)
		event.AddProperty("X-FUNAMBOL-ALLDAY", "1")
		event.AddProperty("X-MICROSOFT-CDO-ALLDAYEVENT", "True")
		event.AddProperty("CLASS", "PUBLIC")
		desc := fmt.Sprintf(`%d(+%d) Cases
%d(+%d) Death Cases
%d(+%d) Recovered Cases 
%d(+%d) Active Cases`, v2.TotalCase.Value, v2.Case.Value,
			v2.TotalDeath.Value,
			v2.Death.Value,
			v2.TotalRecover.Value, v2.Recover.Value,
			v2.TotalActive.Value, v2.Active.Value,
		)
		event.AddProperty("DESCRIPTION", desc)
		event.AddProperty("SUMMARY", fmt.Sprintf("IDN %d(+%d) Case", v2.TotalCase.Value, v2.Case.Value))
		event.AddProperty("URL", "covid19.go.id")
		event.AddProperty("CONTACT", "covid19.go.id")
		event.AddProperty("TRANSP", "TRANSPARENT")

		k4, v4 = goics.FormatDateTimeField("CREATED", time.Unix(v2.Date/1000, 0))
		event.AddProperty(k4, v4)
		k4, v4 = goics.FormatDateTimeField("LAST-MODIFIED", time.Unix(v2.Date/1000, 0))
		event.AddProperty(k4, v4)
		k4, v4 = goics.FormatDateTimeField("DTSTAMP", time.Unix(v2.Date/1000, 0))
		event.AddProperty(k4, v4)
		event.AddProperty("LOCATION", "Indonesia")

		cal.AddComponent(event)
	}

	return cal
}
