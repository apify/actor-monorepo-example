FROM apify/actor-node:16

# Copy root package*.json
COPY package*.json ./

# Copy package.jsons of all used workspace members
COPY actors/javascript-actor/package*.json actors/javascript-actor/
COPY packages/javascript-utils/package*.json packages/javascript-utils/


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
COPY actors/javascript-actor actors/javascript-actor/
COPY packages packages/

# Run the actor's start command when running this image
CMD npm run -w actors/javascript-actor start
