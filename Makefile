.PHONY: clean build lint test coverage docker-up docker-build security-check

include .env

NODE_VERSION_SUPPORTED := >=20.0.0
NODE_VERSION=$(shell node -v)

clean:
	rm -rf ./dist ./coverage

build:
	$(info Node version supported: $(NODE_VERSION_SUPPORTED))
	$(info Node version installed: $(NODE_VERSION))
	npm ci --silent
	npm run build

docker-build:
	$(info docker build starting)
	docker compose -f docker-compose.yml build

docker-up:
ifeq ($(NODE_ENV),development)
	$(info Building development environment)
	docker compose -f docker-compose.yml -f ./infrastructure/docker/development/docker-compose.override.yml up
else
	$(info Building production environment)
	docker compose -f docker-compose.yml up
endif

security-check:
	npm audit

lint:
	npm run lint

test:
	npm run test

coverage:
	npm run coverage
