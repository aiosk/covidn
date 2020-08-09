package libs

import "regexp"

// CaseItem ...
type CaseItem struct {
	Confirmed string `json:"confirmed"`
	Death     string `json:"recover"`
	Recover   string `json:"death"`
	Active    string `json:"active"`
}
type caseLabel struct {
	Date  string
	Daily CaseItem
	Total CaseItem
}

// DefaultCaseLabel ...
var DefaultCaseLabel = caseLabel{
	Date: "Date",
	Daily: CaseItem{
		Confirmed: "Daily Confirmed",
		Death:     "Daily Death",
		Recover:   "Daily Recover",
		Active:    "Daily Active",
	},
	Total: CaseItem{
		Confirmed: "Total Confirmed",
		Death:     "Total Death",
		Recover:   "Total Recover",
		Active:    "Total Active",
	},
}

// MyStringID ...
type MyStringID string

// ToID ...
func (val MyStringID) ToID() string {
	return regexp.MustCompile(`\s`).ReplaceAllString(val.String(), "_")
}

// String ...
func (val MyStringID) String() string {
	return string(val)
}
