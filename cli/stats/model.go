package stats

// Result ...
type Result struct {
	Population int `json:"population"`
	Confirmed  int `json:"confirmed"`
	Recover    int `json:"recover"`
	Death      int `json:"death"`
	Active     int `json:"active"`
}
