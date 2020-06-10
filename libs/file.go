package libs

import (
	"encoding/csv"
	"errors"
	"flag"
	"os"
)

// OpenStdinOrFile ...
func OpenStdinOrFile(cmd *flag.FlagSet) *os.File {
	var err error

	// log.Printf("%+v\n", cmd.Args())
	cmdArgs := cmd.Args()
	if len(cmdArgs) < 1 {
		panic(errors.New("no file specified"))
	}
	var r *os.File
	if cmdArgs[0] == "-" {
		r = os.Stdin
	} else {
		if r, err = os.Open(cmdArgs[0]); err != nil {
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
