package db

import (
	"context"
	"fmt"
	"time"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/sirupsen/logrus"
)

func EnsurePartitionExists(ctx context.Context, pool *pgxpool.Pool, executedAt time.Time) error {
	dt := executedAt.Format("2006-01-02")
	pname := fmt.Sprintf("api_heartbeats_%s", executedAt.Format("2006_01_02"))
	nextDay := executedAt.AddDate(0, 0, 1).Format("2006-01-02")

	query := fmt.Sprintf(
		`CREATE TABLE IF NOT EXISTS %s PARTITION OF api_heartbeats
		 FOR VALUES FROM ('%s'::date) TO ('%s'::date)`,
		pname, dt, nextDay,
	)

	_, err := pool.Exec(ctx, query)
	if err != nil {
		logrus.Warnf("Failed to create partition for %s: %v", dt, err)
		return err
	}

	return nil
}
