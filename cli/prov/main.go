package prov

import (
	"fmt"
	"io"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

func Parse(file io.Reader) {
	// log.Printf("%+v\n", f)
	doc, err := goquery.NewDocumentFromReader(file)
	if err != nil {
		panic(err)
	}
	// log.Printf("%+v\n", doc)
	provList := doc.Find("select[name=state] option:not([value=''])").Map(func(i int, s *goquery.Selection) string {
		value, exists := s.Attr("value")
		if exists != true {
			panic(err)
		}
		// log.Printf("%+v\n", s)
		return value
	})

	// log.Printf("%+v\n", provList)
	fmt.Println(strings.Join(provList[:], "\n"))
}
