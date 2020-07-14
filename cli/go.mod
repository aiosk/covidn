module github.com/aiosk/covidn

go 1.14

require (
	github.com/aiosk/covidn/libs v0.0.0
	github.com/aiosk/covidn/national v0.0.0
	github.com/aiosk/covidn/prov v0.0.0
	github.com/aiosk/covidn/rawan v0.0.0
	github.com/aiosk/covidn/stats v0.0.0
	github.com/davecgh/go-spew v1.1.1 // indirect

)

replace (
	github.com/aiosk/covidn/libs => ./libs
	github.com/aiosk/covidn/national => ./national
	github.com/aiosk/covidn/prov => ./prov
	github.com/aiosk/covidn/rawan => ./rawan
	github.com/aiosk/covidn/stats => ./stats
)
