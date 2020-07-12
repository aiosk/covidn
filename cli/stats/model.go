package stats

// Cases ...
type Cases struct {
	// TotalConfirmed string `json:"totalConfirmed"`
	Confirmed string `json:"confirmed"`
	// TotalRecover string `json:"totalRecover"`
	Recover string `json:"recover"`
	// TotalDeath string `json:"totalDeath"`
	Death string `json:"death"`
	// TotalActive string `json:"totalActive"`
	Active string `json:"active"`
}

// Result ...
type Result struct {
	LastUpdate      string `json:"lastUpdate"`
	Population      int    `json:"population"`
	Total           Cases  `json:"total"`
	Ratio           Cases  `json:"ratio"`
	PopulationRatio Cases  `json:"populationRatio"`
	TotalPercentage Cases  `json:"totalPercentage"`
}
