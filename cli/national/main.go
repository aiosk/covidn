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

	for i := 1; i <= 14; i++ {
		dirpath := fmt.Sprintf("dist/web/%d", i)
		libs.WriteToFile(dirpath, "NATIONAL.csv", inputFileClean.Chunk(i).ToCsv())
	}

}
