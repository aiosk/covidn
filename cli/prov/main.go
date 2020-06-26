package prov

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"strings"

	"github.com/PuerkitoBio/goquery"
	"github.com/aiosk/covidn/libs"
)

// Main ...
func Main(file io.Reader) {
	// log.Printf("%+v\n", f)
	doc, err := goquery.NewDocumentFromReader(file)
	libs.PanicError(err)

	// log.Printf("%+v\n", doc)
	provList := doc.Find("select[name=state] option:not([value=''])").Map(func(i int, s *goquery.Selection) string {
		value, exists := s.Attr("value")
		if exists != true {
			libs.PanicError(errors.New("attr value not exist"))
		}
		// log.Printf("%+v\n", s)
		return value
	})

	// log.Printf("%+v\n", provList)
	fmt.Println(strings.Join(provList[:], "\n"))
}

// Item ...
func Item(file io.Reader) {
	var provItem FileItem
	err := json.NewDecoder(file).Decode(&provItem)
	libs.PanicError(err)

	// log.Printf("%+v\n", strings.ReplaceAll(provItem.Provinsi, " ", "_"))
	fileName := strings.ReplaceAll(provItem.Provinsi, " ", "_")
	filepathCsv := fmt.Sprintf("dist/csv/%s.csv", fileName)
	filepathIcs := fmt.Sprintf("dist/ics/%s.ics", fileName)
	filepathChartjs := fmt.Sprintf("dist/chartjs/%s.json", fileName)
	libs.WriteToCsv(filepathCsv, provItem.ToCsv())
	libs.WriteToIcs(filepathIcs, provItem)
	libs.WriteToChartjs(filepathChartjs, provItem.ToChartjs())

}
