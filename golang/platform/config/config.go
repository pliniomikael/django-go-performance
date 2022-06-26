package config

import (
	"flag"
	"fmt"
	"net/url"
	"os"
)

type Config struct {

	// DB
	dbUser string
	dbPwd  string
	dbHost string
	dbPort string
	dbName string

}

func Get() *Config {
	conf := &Config{}

	// DB
	flag.StringVar(&conf.dbUser, "dbuser", os.Getenv("DB_USER"), "DB user name")
	flag.StringVar(&conf.dbPwd, "dbpwd", os.Getenv("DB_PASSWORD"), "DB pass")
	flag.StringVar(&conf.dbPort, "dbport", os.Getenv("DB_PORT"), "DB port")
	flag.StringVar(&conf.dbHost, "dbhost", os.Getenv("DB_HOST"), "DB host")
	flag.StringVar(&conf.dbName, "dbname", os.Getenv("DB_DATABASE"), "DB name")

	flag.Parse()

	return conf
}

func (c *Config) GetDBConnStr() string {
	return c.getDBConnStr(c.dbHost, c.dbName)
}

func (c *Config) getDBConnStr(dbhost, dbname string) string {
	user := url.PathEscape(c.dbUser)
	password := url.PathEscape(c.dbPwd)

	return fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		user,
		password,
		dbhost,
		c.dbPort,
		dbname,
	)
}

