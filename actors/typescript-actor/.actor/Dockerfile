# Build the TypeScript code in a separate stage, to reduce the size of the final image.
FROM apify/actor-node:16 AS builder
WORKDIR /app

# Copy root package*.json
COPY package*.json ./

# Copy package.jsons of all used workspace members
COPY actors/typescript-actor/package*.json actors/typescript-actor/
COPY packages/javascript-utils/package*.json packages/javascript-utils/
COPY packages/typescript-utils/package*.json packages/typescript-utils/

# Install all dependencies. Don't audit to speed up the installation.
RUN npm install --include=dev --audit=false

# Next, copy the rest of the source files.
COPY actors/typescript-actor actors/typescript-actor/
COPY packages packages/
COPY tsconfig.build.json ./

# Build the TypeScript libraries
RUN npm run -w actors/typescript-actor build



# Create the final image, only with compiled code and production dependencies.
FROM apify/actor-node:16

# Copy root package*.json
COPY package*.json ./

# Copy package.jsons of all workspace members
COPY actors/typescript-actor/package*.json actors/typescript-actor/
COPY packages/javascript-utils/package*.json packages/javascript-utils/
COPY packages/typescript-utils/package*.json packages/typescript-utils/

# Install NPM packages, skip optional and development dependencies to
# keep the image small. Avoid logging too much and print the dependency
# tree for debugging
RUN npm --quiet set progress=false \
    && npm install --omit=dev --omit=optional \
    && echo "Installed NPM packages:" \
    && (npm list --omit=dev --all || true) \
    && echo "Node.js version:" \
    && node --version \
    && echo "NPM version:" \
    && npm --version \
    && rm -r ~/.npm

# Copy the rest of the source files.
COPY actors/typescript-actor actors/typescript-actor/
COPY packages packages/

# Copy built JS files from the `builder` stage
COPY --from=builder /app/actors/typescript-actor/dist actors/typescript-actor/dist
COPY --from=builder /app/packages/typescript-utils/dist packages/typescript-utils/dist

# Run the actor's start command when running this image
CMD npm run -w actors/typescript-actor start:prod
