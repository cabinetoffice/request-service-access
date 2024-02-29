.PHONY: clean build lint test coverage docker-up docker-build security-check

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
	$(info webapp starting)
	docker compose -f docker-compose.yml up

security-check:
	npm audit

lint:
	npm run lint

test:
	npm run test

coverage:
	npm run coverage
