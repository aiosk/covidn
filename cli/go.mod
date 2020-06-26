module github.com/aiosk/covidn

go 1.14

require (
	github.com/PuerkitoBio/goquery v1.5.1 // indirect
	github.com/aiosk/covidn/libs v0.0.0
	github.com/aiosk/covidn/national v0.0.0
	github.com/aiosk/covidn/prov v0.0.0
	github.com/aiosk/covidn/rawan v0.0.0
	github.com/jordic/goics v0.0.0-20181215212140-feb996c8e01f
	github.com/sajari/regression v1.0.1 // indirect
	gonum.org/v1/gonum v0.7.0 // indirect
)

replace (
	github.com/aiosk/covidn/libs => ./libs
	github.com/aiosk/covidn/national => ./national
	github.com/aiosk/covidn/prov => ./prov
	github.com/aiosk/covidn/rawan => ./rawan
)
