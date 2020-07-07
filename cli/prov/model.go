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

	var item [8]libs.ChartjsDatasetsItem

	for _, v2 := range v.ListPerkembangan {
		data.Labels = append(data.Labels, v2.DateStr)
		item[0].Data = append(item[0].Data, float64(v2.Case))
		item[2].Data = append(item[2].Data, float64(v2.Recover))
		item[4].Data = append(item[4].Data, float64(v2.Death))
		item[6].Data = append(item[6].Data, float64(v2.Active))
	}

	item[0].Label = libs.ChartjsLabel.Confirmed
	item[2].Label = libs.ChartjsLabel.Recover
	item[4].Label = libs.ChartjsLabel.Death
	item[6].Label = libs.ChartjsLabel.Active
	item[0].BackgroundColor = libs.ChartjsColor.Confirmed
	item[2].BackgroundColor = libs.ChartjsColor.Recover
	item[4].BackgroundColor = libs.ChartjsColor.Death
	item[6].BackgroundColor = libs.ChartjsColor.Active

	item[1].Data = libs.MyRegression(item[0].Data)
	item[3].Data = libs.MyRegression(item[2].Data)
	item[5].Data = libs.MyRegression(item[4].Data)
	item[7].Data = libs.MyRegression(item[6].Data)

	item[1].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Confirmed)
	item[3].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Recover)
	item[5].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Death)
	item[7].Label = fmt.Sprintf("%s fitted", libs.ChartjsLabel.Active)
	item[1].Type = "line"
	item[3].Type = "line"
	item[5].Type = "line"
	item[7].Type = "line"
	item[1].BorderColor = libs.ChartjsColor.Confirmed
	item[3].BorderColor = libs.ChartjsColor.Recover
	item[5].BorderColor = libs.ChartjsColor.Death
	item[7].BorderColor = libs.ChartjsColor.Active

	data.Datasets = append(data.Datasets, item[0])
	data.Datasets = append(data.Datasets, item[1])
	data.Datasets = append(data.Datasets, item[2])
	data.Datasets = append(data.Datasets, item[3])
	data.Datasets = append(data.Datasets, item[4])
	data.Datasets = append(data.Datasets, item[5])
	data.Datasets = append(data.Datasets, item[6])
	data.Datasets = append(data.Datasets, item[7])
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
