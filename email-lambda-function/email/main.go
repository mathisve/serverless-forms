package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"regexp"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	_ "github.com/lib/pq"
)

var db *sql.DB

type input struct {
	Email string `json:"email"`
}

const INSERT_STATEMENT = `INSERT INTO email (email, ip) VALUES ($1::citext, $2::inet)`

func init() {
	dbUrl, found := os.LookupEnv("DB_URL")
	if !found {
		log.Fatal("db url not found")
	}

	var err error
	db, err = sql.Open("postgres", dbUrl)
	if err != nil {
		log.Fatal(err)
	}
}

func handler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {

	var i input
	err := json.Unmarshal([]byte(request.Body), &i)
	if err != nil {
		return Return400(err)
	}

	log.Println(i.Email)

	if !isEmailValid(i.Email) {
		return Return400(nil)
	}

	sourceIP := request.Headers["x-forwarded-for"]

	_, err = db.Exec(INSERT_STATEMENT, i.Email, sourceIP)
	if err != nil {
		return Return500(err)
	}

	return Return201(nil)
}

func Return201(err error) (events.APIGatewayProxyResponse, error) {
	return events.APIGatewayProxyResponse{StatusCode: http.StatusCreated}, err
}

func Return400(err error) (events.APIGatewayProxyResponse, error) {
	log.Println(err)
	return events.APIGatewayProxyResponse{StatusCode: http.StatusBadRequest}, err
}

func Return500(err error) (events.APIGatewayProxyResponse, error) {
	log.Println(err)
	return events.APIGatewayProxyResponse{StatusCode: http.StatusInternalServerError}, err
}

func isEmailValid(e string) bool {
	emailRegex := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	return emailRegex.MatchString(e)
}

func main() {
	lambda.Start(handler)
}
