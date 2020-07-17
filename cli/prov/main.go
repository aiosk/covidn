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
	doc, err := goquery.NewDocumentFromReader(file)
	libs.PanicError(err)

	provList := doc.Find("select[name=state] option:not([value=''])").Map(func(i int, s *goquery.Selection) string {
		value, exists := s.Attr("value")
		if exists != true {
			libs.PanicError(errors.New("attr value not exist"))
		}
		return value
	})

	fmt.Println(strings.Join(provList[:], "\n"))
}

// Item ...
func Item(file io.Reader) {
	disipinID := make(map[string]DisiplinIDItem)
	csvFile := libs.ReadFile("assets/covid19.disiplin.id.json")
	err := json.Unmarshal(csvFile, &disipinID)
	libs.PanicError(err)

	var inputFile InputFile
	err = json.NewDecoder(file).Decode(&inputFile)
	libs.PanicError(err)

	fileName := strings.ReplaceAll(inputFile.Provinsi, " ", "_")

	inputFileClean := inputFile.ListPerkembangan.Clean(disipinID[inputFile.Provinsi])
	libs.WriteToFile("dist/desktop", fmt.Sprintf("%s.csv", fileName), inputFileClean.ToCsv())

	periods := [5]int{1, 3, 7, 14, 28}
	for _, v := range periods {
		dirpath := fmt.Sprintf("dist/web/daily/%d", v)
		libs.WriteToFile(dirpath, fmt.Sprintf("%s.csv", fileName), inputFileClean.Chunk(v).ToCsv())
	}

}
