package national

import (
	"fmt"
	"strconv"
	"time"

	"github.com/aiosk/covidn/libs"
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

// GetTags ...
func (v HarianItem) GetTags(tag string) map[string]string {
	return libs.StructGetTags(v, tag)
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
	var data [][]string
	tags := v[0].GetTags("json")
	title := []string{
		tags["DateStr"],
		tags["TotalCase"], tags["Case"],
		tags["TotalRecover"], tags["Recover"],
		tags["TotalDeath"], tags["Death"],
		tags["TotalActive"], tags["Active"],
	}
	data = append(data, title)

	for _, v := range v {
		// log.Printf("%+v\n", v)
		row := []string{
			v.DateStr[:10],
			strconv.Itoa(v.TotalCase.Value), strconv.Itoa(v.Case.Value),
			strconv.Itoa(v.TotalRecover.Value), strconv.Itoa(v.Recover.Value),
			strconv.Itoa(v.TotalDeath.Value), strconv.Itoa(v.Death.Value),
			strconv.Itoa(v.TotalActive.Value), strconv.Itoa(v.Active.Value),
		}
		data = append(data, row)
	}

	return data
}

// ToChartjs ...
func (v HarianList) ToChartjs() libs.Chartjs {
	var data libs.Chartjs
	tags := v[0].GetTags("json")

	var item [4]libs.ChartjsDatasetsItem
	for _, v2 := range v {
		data.Labels = append(data.Labels, v2.DateStr[:10])
		item[0].Data = append(item[0].Data, v2.Case.Value)
		item[1].Data = append(item[1].Data, v2.Recover.Value)
		item[2].Data = append(item[2].Data, v2.Death.Value)
		item[3].Data = append(item[3].Data, v2.Active.Value)
	}

	item[0].Label = tags["Case"]
	item[1].Label = tags["Recover"]
	item[2].Label = tags["Death"]
	item[3].Label = tags["Active"]

	item[0].BgColor = libs.ChartjsColor["case"]
	item[1].BgColor = libs.ChartjsColor["recover"]
	item[2].BgColor = libs.ChartjsColor["death"]
	item[3].BgColor = libs.ChartjsColor["active"]

	data.Datasets = append(data.Datasets, item[0])
	data.Datasets = append(data.Datasets, item[1])
	data.Datasets = append(data.Datasets, item[2])
	data.Datasets = append(data.Datasets, item[3])
	return data
}

// Chunk ...
func (v HarianList) Chunk(size int) HarianList {
	var chunks []HarianList
	for size < len(v) {
		v, chunks = v[size:], append(chunks, v[0:size:size])
	}

	chunks = append(chunks, v)

	var newData HarianList
	for _, v2 := range chunks {
		var item HarianItem
		item.Date = v2[0].Date
		item.DateStr = v2[0].DateStr
		item.Case.Value = 0
		item.Recover.Value = 0
		item.Death.Value = 0
		item.Active.Value = 0
		for _, v3 := range v2 {
			item.Case.Value += v3.Case.Value
			item.Recover.Value += v3.Recover.Value
			item.Death.Value += v3.Death.Value
			item.Active.Value += v3.Active.Value
		}

		newData = append(newData, item)
	}
	return newData
}

// EmitICal ...
func (v HarianList) EmitICal() goics.Componenter {

	cal := goics.NewComponent()
	cal.SetType("VCALENDAR")
	cal.AddProperty("CALSCAL", "GREGORIAN")
	cal.AddProperty("PRODID;X-RICAL-TZSOURCE=TZINFO", "-//tmpo.io")
	cal.AddProperty("SUMMARY", "Covid-19 Cases INDONESIA")

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
%d(+%d) Recovered Cases 
%d(+%d) Death Cases
%d(+%d) Active Cases`, v2.TotalCase.Value, v2.Case.Value,
			v2.TotalRecover.Value, v2.Recover.Value,
			v2.TotalDeath.Value, v2.Death.Value,
			v2.TotalActive.Value, v2.Active.Value,
		)
		event.AddProperty("DESCRIPTION", desc)
		event.AddProperty("SUMMARY", fmt.Sprintf("%d(+%d) Covid-19 Cases", v2.TotalCase.Value, v2.Case.Value))
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
