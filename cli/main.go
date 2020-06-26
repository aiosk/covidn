package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/aiosk/covidn/libs"
	"github.com/aiosk/covidn/national"
	"github.com/aiosk/covidn/prov"
	"github.com/aiosk/covidn/rawan"
)

func printHelp() {
	fmt.Println(`Usage see https://github.com/aiosk/covidn/blob/master/cli/README.md`)
}

func main() {
	cmdNational := flag.NewFlagSet("national", flag.ExitOnError)
	cmdProv := flag.NewFlagSet("prov", flag.ExitOnError)
	cmdProvItem := flag.NewFlagSet("provitem", flag.ExitOnError)
	cmdRawan := flag.NewFlagSet("rawan", flag.ExitOnError)

	if len(os.Args) < 2 {
		printHelp()
		os.Exit(1)
	}
	var srcFile *os.File
	switch os.Args[1] {
	case "national":
		cmdNational.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdNational)
		national.Main(srcFile)
	case "prov":
		cmdProv.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdProv)
		prov.Main(srcFile)
	case "provitem":
		cmdProvItem.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdProvItem)
		prov.Item(srcFile)
	case "rawan":
		cmdRawan.Parse(os.Args[2:])
		srcFile = libs.OpenStdinOrFile(cmdRawan)
		rawan.Main(srcFile)
	default:
		printHelp()
		os.Exit(1)
	}

	defer srcFile.Close()
}
