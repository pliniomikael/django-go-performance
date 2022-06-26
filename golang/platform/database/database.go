package database

import (
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type DB struct {
	Client  *sqlx.DB
	Scripts *Scripts
}

func Get(connStr string) (*DB, error) {
	db, err := get(connStr)
	scripts, errScripts := LoadSQLScripts()

	if err != nil {
		return nil, err
	}
	if errScripts != nil {
		return nil, err
	}

	return &DB{
		Client:  db,
		Scripts: scripts,
	}, nil
}

func (d *DB) Close() error {
	return d.Client.Close()
}

func get(connStr string) (*sqlx.DB, error) {
	db, err := sqlx.Connect("postgres", connStr)
	if err != nil {
		return nil, err
	}

	db.SetMaxOpenConns(180)
	db.SetMaxIdleConns(20)
	db.SetConnMaxLifetime(2 * time.Minute)

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}
