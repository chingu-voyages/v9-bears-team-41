.PHONY: local

local:
	# cd client && docker build -f Dockerfile -t path/to/registry/app_service:master .
	cd server && docker build -f Dockerfile -t path/to/registry/server_service:master .
	docker-compose up -d
