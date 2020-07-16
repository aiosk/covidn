package national

import (
	"encoding/json"
	"fmt"
	"io"

	"github.com/aiosk/covidn/libs"
)

// Main ...
func Main(file io.Reader) {
	var inputFile InputFile
	err := json.NewDecoder(file).Decode(&inputFile)
	libs.PanicError(err)

	inputFileClean := inputFile.Update.Harian.Clean()
	libs.WriteToFile("dist/desktop", "NATIONAL.csv", inputFileClean.ToCsv())

	periods := [5]int{1, 3, 7, 14, 28}
	for _, v := range periods {
		dirpath := fmt.Sprintf("dist/web/daily/%d", v)
		libs.WriteToFile(dirpath, "NATIONAL.csv", inputFileClean.Chunk(v).ToCsv())
	}

}
