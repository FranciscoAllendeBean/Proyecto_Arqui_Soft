package Models

type usuario struct {
	id       int    `gorm:"primaryKey"`
	name     string `gorm:"varchar(50);not null"`
	surname  string `gorm:"varchar(50);not null"`
	dni      int    `gorm:"not null"`
	user     string `gorm:"varchar(50);not null"`
	password string `gorm:"varchar(50);not null"`
	usertype string `gorm:"varchar(50);not null"`
}

type usuarios []usuario
