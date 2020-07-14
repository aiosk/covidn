package libs

import (
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"os"
)

// OpenStdinOrFile ...
func OpenStdinOrFile(cmd *flag.FlagSet) *os.File {
	var err error

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

// WriteToFile ...
func WriteToFile(dirpath string, filename string, data []byte) {
	filepath := fmt.Sprintf("%s/%s", dirpath, filename)

	err := os.MkdirAll(dirpath, os.ModePerm)
	PanicError(err)

	file, err := os.Create(filepath)
	FatalError("Cannot create file", err)
	defer func() {
		err := file.Close()
		PanicError(err)
	}()

	err = ioutil.WriteFile(filepath, data, os.ModePerm)
	PanicError(err)
	log.Printf("Write to %s", filepath)
}

// ReadFile ...
func ReadFile(filepath string) []byte {
	file, err := ioutil.ReadFile(filepath)
	PanicError(err)

	return file
}

// WriteToJSON ...
func WriteToJSON(dirpath string, filename string, data interface{}) {
	// jsonStr, err := json.MarshalIndent(data, "", "  ")

	filepath := fmt.Sprintf("%s/%s", dirpath, filename)

	err := os.MkdirAll(dirpath, os.ModePerm)
	PanicError(err)

	jsonStr, err := json.Marshal(data)
	PanicError(err)

	err = ioutil.WriteFile(filepath, jsonStr, os.ModePerm)
	PanicError(err)
	log.Printf("Write to %s", filepath)
}
