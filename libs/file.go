package libs

import (
	"encoding/csv"
	"flag"
	"io"
	"os"
)

// OpenStdinOrFile ...
func OpenStdinOrFile(cmd *flag.FlagSet) io.Reader {
	var err error
	r := os.Stdin

	// log.Printf("%+v\n", cmd.Args())
	if len(cmd.Args()) > 1 {
		r, err = os.Open(cmd.Args()[0])
		if err != nil {
			panic(err)
		}
	}
	return r
}

// WriteToCsv ...
func WriteToCsv(data [][]string) {
	w := csv.NewWriter(os.Stdout)
	w.WriteAll(data)
	if err := w.Error(); err != nil {
		panic(err)
	}
}
