package db

import (
	actividadClient "Backend/clients"
	inscripcionClient "Backend/clients"
	usuarioClient "Backend/clients"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	dba *gorm.DB
	err error
)

func init() {

	dba, err = gorm.Open(mysql.Open("root:Lola2002@tcp(127.0.0.1:3306)/gimnasio"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
	})

	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}

	usuarioClient.Db = dba
	actividadClient.Db = dba
	inscripcionClient.Db = dba
}
