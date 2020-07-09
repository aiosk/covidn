package stats

// Result ...
type Result struct {
	LastUpdate     string `json:"lastUpdate"`
	Population     int    `json:"population"`
	TotalConfirmed string `json:"totalConfirmed"`
	// Confirmed      string `json:"confirmed"`
	TotalRecover string `json:"totalRecover"`
	// Recover        string `json:"recover"`
	TotalDeath string `json:"totalDeath"`
	// Death          string `json:"death"`
	TotalActive string `json:"totalActive"`
	// Active         string `json:"active"`
}
