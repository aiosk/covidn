package libs

import (
	"math"

	"github.com/sajari/regression"
)

// ChartjsDatasetsItem ...
type ChartjsDatasetsItem struct {
	Label           string    `json:"label"`
	Data            []float64 `json:"data"`
	BackgroundColor string    `json:"backgroundColor,omitempty"`
	BorderColor     string    `json:"borderColor,omitempty"`
	Type            string    `json:"type,omitempty"`
}

// Chartjs ...
type Chartjs struct {
	Labels   []string              `json:"labels"`
	Datasets []ChartjsDatasetsItem `json:"datasets"`
}

type datasets struct {
	Confirmed string
	Death     string
	Recover   string
	Active    string
}

// ChartjsColor ...
var ChartjsColor = datasets{
	Confirmed: "#2C347C",
	Death:     "#ec6f58",
	Recover:   "#3c928c",
	Active:    "#ceb546",
}

// ChartjsLabel ...
var ChartjsLabel = datasets{
	Confirmed: "Confirmed",
	Death:     "Death",
	Recover:   "Recover",
	Active:    "Active",
}

// MyRegression ...
func MyRegression(data []float64) []float64 {
	var newData []float64

	r := new(regression.Regression)
	r.SetObserved("case")
	r.SetVar(0, "x")
	r.SetVar(1, "x^2")
	r.SetVar(2, "x^3")
	// r.SetVar(3, "x^4")

	for i, v2 := range data {
		x := float64(i + 1)
		r.Train(regression.DataPoint(v2, []float64{x, math.Pow(x, 2), math.Pow(x, 3)}))
		// r.Train(regression.DataPoint(v2, []float64{x, math.Pow(x, 2), math.Pow(x, 3), math.Pow(x, 4)}))
	}
	r.Run()

	for i := range data {
		x := float64(i + 1)
		itemRegression := r.Coeff(0) + r.Coeff(1)*x + r.Coeff(2)*math.Pow(x, 2) + r.Coeff(3)*math.Pow(x, 3)
		// itemRegression := r.Coeff(0) + r.Coeff(1)*x + r.Coeff(2)*math.Pow(x, 2) + r.Coeff(3)*math.Pow(x, 3) + r.Coeff(4)*math.Pow(x, 4)

		newData = append(newData, itemRegression)
	}

	return newData
}
