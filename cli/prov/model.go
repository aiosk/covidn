package prov

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/aiosk/covidn/libs"
	"github.com/jordic/goics"
)

// Perkembangan ...
type Perkembangan struct {
	Date         int64  `json:"tanggal"`
	DateStr      string `json:"date"`
	Death        int    `json:"MENINGGAL"`
	Active       int    `json:"DIRAWAT_OR_ISOLASI"`
	Recover      int    `json:"SEMBUH"`
	Case         int    `json:"KASUS"`
	TotalDeath   int    `json:"AKUMULASI_MENINGGAL"`
	TotalActive  int    `json:"AKUMULASI_DIRAWAT_OR_ISOLASI"`
	TotalRecover int    `json:"AKUMULASI_SEMBUH"`
	TotalCase    int    `json:"AKUMULASI_KASUS"`
}

// PerkembanganList ...
type PerkembanganList []Perkembangan

// GetTags ...
func (v Perkembangan) GetTags(tag string) map[string]string {
	return libs.StructGetTags(v, tag)
}

// FileItem ...
type FileItem struct {
	Provinsi         string           `json:"provinsi"`
	ListPerkembangan PerkembanganList `json:"list_perkembangan"`
}

// GetTags ...
func (v FileItem) GetTags(tag string) map[string]string {
	return libs.StructGetTags(v, tag)
}

// Cleaning ...
func (v FileItem) Cleaning() FileItem {
	var newData FileItem

	start := time.Date(2020, 3, 1, 0, 0, 0, 0, time.UTC)
	end := time.Now()
	for d := start; d.After(end) == false; d = d.AddDate(0, 0, 1) {
		date := d.Unix() * 1000

		idx := sort.Search(len(v.ListPerkembangan), func(i int) bool {
			return v.ListPerkembangan[i].Date >= date
		})
		if idx < len(v.ListPerkembangan) && v.ListPerkembangan[idx].Date == date {
			// log.Println("found", d.Format("2006-01-02"), v[idx])
			newData.ListPerkembangan = append(newData.ListPerkembangan, v.ListPerkembangan[idx])
		} else {
			// log.Println("not found", d.Format("2006-01-02"))
			item := Perkembangan{Date: date}
			newData.ListPerkembangan = append(newData.ListPerkembangan, item)
		}
	}
	newData.Provinsi = v.Provinsi
	return newData
}

// ToCsv ...
func (v FileItem) ToCsv() [][]string {

	var dataCsv [][]string
	// itemTags := v.GetTags("json")
	listPerkembanganTags := v.ListPerkembangan[0].GetTags("json")
	title := []string{
		// itemTags["Provinsi"],
		listPerkembanganTags["Date"],
		listPerkembanganTags["TotalCase"], listPerkembanganTags["Case"],
		listPerkembanganTags["TotalRecover"], listPerkembanganTags["Recover"],
		listPerkembanganTags["TotalDeath"], listPerkembanganTags["Death"],
		listPerkembanganTags["TotalActive"], listPerkembanganTags["Active"],
	}
	dataCsv = append(dataCsv, title)

	for _, v2 := range v.ListPerkembangan {
		row := []string{
			// v.Provinsi,
			libs.UnixToMyFormat(v2.Date),
			strconv.Itoa(v2.TotalCase), strconv.Itoa(v2.Case),
			strconv.Itoa(v2.TotalRecover), strconv.Itoa(v2.Recover),
			strconv.Itoa(v2.TotalDeath), strconv.Itoa(v2.Death),
			strconv.Itoa(v2.TotalActive), strconv.Itoa(v2.Active),
		}
		dataCsv = append(dataCsv, row)
	}

	return dataCsv
}

// Chunk ...
func (v FileItem) Chunk(size int) FileItem {
	var chunks []PerkembanganList
	for size < len(v.ListPerkembangan) {
		v.ListPerkembangan, chunks = v.ListPerkembangan[size:], append(chunks, v.ListPerkembangan[0:size:size])
	}

	chunks = append(chunks, v.ListPerkembangan)

	var newData FileItem
	for _, v2 := range chunks {
		var item Perkembangan
		if size == 1 {
			item.DateStr = libs.UnixToMyShortFormat(v2[0].Date)
		} else {
			item.DateStr = fmt.Sprintf("%s - %s", libs.UnixToMyShortFormat(v2[0].Date), libs.UnixToMyShortFormat(v2[len(v2)-1].Date))
		}
		item.Case = 0
		item.Recover = 0
		item.Death = 0
		item.Active = 0

		length := len(v2)
		validIdx := length - 1
		i := 0
		found := false

		for found == false {
			i++
			if i > length-1 {
				break
			}
			// log.Printf("%+v\n", v2)
			// log.Printf("%+v\n", length)
			// log.Printf("%+v\n", i)
			if v2[length-i].TotalCase != 0 {
				found = true
			}
		}
		validIdx = length - i

		item.TotalCase = v2[validIdx].TotalCase
		item.TotalRecover = v2[validIdx].TotalRecover
		item.TotalDeath = v2[validIdx].TotalDeath
		item.TotalActive = v2[validIdx].TotalActive

		for _, v3 := range v2 {
			item.Case += v3.Case
			item.Recover += v3.Recover
			item.Death += v3.Death
			item.Active += v3.Active
		}

		newData.ListPerkembangan = append(newData.ListPerkembangan, item)
	}
	newData.Provinsi = v.Provinsi
	return newData
}

// ToChartjs ...
func (v FileItem) ToChartjs() libs.Chartjs {
	var data libs.Chartjs

	var item [4 * 3]libs.ChartjsDatasetsItem

	for _, v2 := range v.ListPerkembangan {
		data.Labels = append(data.Labels, v2.DateStr)
		item[0].Data = append(item[0].Data, float64(v2.Case))
		item[1].Data = append(item[1].Data, float64(v2.Recover))
		item[2].Data = append(item[2].Data, float64(v2.Death))
		item[3].Data = append(item[3].Data, float64(v2.Active))

		item[4].Data = append(item[4].Data, float64(v2.TotalCase))
		item[5].Data = append(item[5].Data, float64(v2.TotalRecover))
		item[6].Data = append(item[6].Data, float64(v2.TotalDeath))
		item[7].Data = append(item[7].Data, float64(v2.TotalActive))
	}

	item[0].Label = libs.ChartjsLabel.Confirmed
	item[1].Label = libs.ChartjsLabel.Recover
	item[2].Label = libs.ChartjsLabel.Death
	item[3].Label = libs.ChartjsLabel.Active
	item[0].BorderColor = libs.ChartjsColor.Confirmed
	item[1].BorderColor = libs.ChartjsColor.Recover
	item[2].BorderColor = libs.ChartjsColor.Death
	item[3].BorderColor = libs.ChartjsColor.Active

	item[4].Label = libs.ChartjsLabel.TotalConfirmed
	item[5].Label = libs.ChartjsLabel.TotalRecover
	item[6].Label = libs.ChartjsLabel.TotalDeath
	item[7].Label = libs.ChartjsLabel.TotalActive
	item[4].BorderColor = libs.ChartjsColor.Confirmed
	item[5].BorderColor = libs.ChartjsColor.Recover
	item[6].BorderColor = libs.ChartjsColor.Death
	item[7].BorderColor = libs.ChartjsColor.Active

	item[8].Data = libs.MyRegression(item[0].Data)
	item[9].Data = libs.MyRegression(item[1].Data)
	item[10].Data = libs.MyRegression(item[2].Data)
	item[11].Data = libs.MyRegression(item[3].Data)

	item[8].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Confirmed)
	item[9].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Recover)
	item[10].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Death)
	item[11].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Active)
	item[8].BorderColor = libs.ChartjsColor.Confirmed
	item[9].BorderColor = libs.ChartjsColor.Recover
	item[10].BorderColor = libs.ChartjsColor.Death
	item[11].BorderColor = libs.ChartjsColor.Active

	for i := range item {
		data.Datasets = append(data.Datasets, item[i])
	}
	return data
}

// EmitICal ...
func (v FileItem) EmitICal() goics.Componenter {

	cal := goics.NewComponent()
	cal.SetType("VCALENDAR")
	cal.AddProperty("CALSCAL", "GREGORIAN")
	cal.AddProperty("PRODID;X-RICAL-TZSOURCE=TZINFO", "-//tmpo.io")
	cal.AddProperty("SUMMARY", "Covid-19 Province INDONESIA")

	for _, v3 := range v.ListPerkembangan {
		event := goics.NewComponent()
		event.SetType("VEVENT")

		event.AddProperty("UID", fmt.Sprintf("%s-%s@covid19.go.id", strings.Replace(v.Provinsi, " ", "_", -1), libs.UnixToMyFormat(v3.Date)))
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
		event.AddProperty("SUMMARY", fmt.Sprintf("%s %d(+%d) Covid-19 Cases", v.Provinsi, v3.TotalCase, v3.Case))
		event.AddProperty("URL", "covid19.go.id")
		event.AddProperty("CONTACT", "covid19.go.id")
		event.AddProperty("TRANSP", "TRANSPARENT")

		k4, v4 = goics.FormatDateTimeField("CREATED", time.Unix(v3.Date/1000, 0))
		event.AddProperty(k4, v4)
		k4, v4 = goics.FormatDateTimeField("LAST-MODIFIED", time.Unix(v3.Date/1000, 0))
		event.AddProperty(k4, v4)
		k4, v4 = goics.FormatDateTimeField("DTSTAMP", time.Unix(v3.Date/1000, 0))
		event.AddProperty(k4, v4)
		event.AddProperty("LOCATION", fmt.Sprintf("%s - Indonesia", v.Provinsi))

		cal.AddComponent(event)
	}

	return cal
}
