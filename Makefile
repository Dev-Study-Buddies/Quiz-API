build:
	docker-compose -f docker-compose-dev.yml build

start:
	docker-compose -f docker-compose-dev.yml up

shutdown:
	docker-compose -f docker-compose-dev.yml down