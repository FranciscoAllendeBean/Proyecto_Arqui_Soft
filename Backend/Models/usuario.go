package Models

type Usuario struct {
	Id       int    `gorm:"primaryKey"`
	Name     string `gorm:"varchar(50);not null"`
	Surname  string `gorm:"varchar(50);not null"`
	Dni      int    `gorm:"not null"`
	User     string `gorm:"varchar(50);not null"`
	Password string `gorm:"varchar(50);not null"`
	Role     string `gorm:"varchar(50);not null"`
}

type Usuarios []Usuario
