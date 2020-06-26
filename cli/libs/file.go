package libs

import (
	"bufio"
	"encoding/csv"
	"errors"
	"flag"
	"log"
	"os"

	"github.com/jordic/goics"
)

// OpenStdinOrFile ...
func OpenStdinOrFile(cmd *flag.FlagSet) *os.File {
	var err error

	// log.Printf("%+v\n", cmd.Args())
	cmdArgs := cmd.Args()
	if len(cmdArgs) < 1 {
		PanicError(errors.New("no file specified"))
	}
	var r *os.File
	if cmdArgs[0] == "-" {
		r = os.Stdin
	} else {
		r, err = os.Open(cmdArgs[0])
		PanicError(err)
	}

	return r
}

// WriteToCsv ...
func WriteToCsv(filepath string, data [][]string) {
	file, err := os.Create(filepath)
	FatalError("Cannot create file", err)
	defer func() {
		err := file.Close()
		PanicError(err)
	}()

	w := csv.NewWriter(file)
	err = w.WriteAll(data)
	FatalError("Cannot write file", err)
	log.Printf("Write to %s", filepath)
}

// WriteToIcs ...
func WriteToIcs(filepath string, data interface{}) {
	file, err := os.Create(filepath)
	FatalError("Cannot create file", err)
	defer func() {
		err := file.Close()
		PanicError(err)
	}()

	f := bufio.NewWriter(file)
	defer func() {
		err := f.Flush()
		PanicError(err)
		log.Printf("Write to %s", filepath)
	}()
	goics.NewICalEncode(f).Encode(data.(goics.ICalEmiter))

}
