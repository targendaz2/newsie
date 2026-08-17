FROM node:24

ARG TZ
ENV TZ="$TZ"

ARG CLAUDE_CODE_VERSION=latest

# Install basic development tools and iptables/ipset
RUN /bin/sh -c set -eux; \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    less \
    git \
    procps \
    sudo \
    zsh \
    man-db \
    unzip \
    gnupg2 \
    gh \
    iptables \
    ipset \
    iproute2 \
    dnsutils \
    aggregate \
    jq \
    xdg-utils \
    nano \
    vim; \
  apt-get clean; \
  rm -rf /var/lib/apt/lists/*

# Install Task
RUN /bin/sh -c set -eux; \
  curl -1sLf 'https://dl.cloudsmith.io/public/task/task/setup.deb.sh' | sudo -E bash; \
  apt-get update; \
  apt-get install -y --no-install-recommends task; \
  apt-get clean; \
  rm -rf /var/lib/apt/lists/*

# Enable Corepack
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
RUN corepack enable

# Install Playwright browsers
ARG PLAYWRIGHT_VERSION=1.62.1
RUN npx -y playwright@${PLAYWRIGHT_VERSION} install --with-deps

# Ensure default node user has access to /usr/local/share
RUN /bin/sh -c set -eux; \
  mkdir -p /usr/local/share/npm-global; \
  chown -R node:node /usr/local/share

ARG USERNAME=node

# Persist bash history.
RUN /bin/sh -c set -eux; \
  SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history"; \
  mkdir /commandhistory; \
  touch /commandhistory/.bash_history; \
  chown -R $USERNAME /commandhistory

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true

# Create workspace and config directories and set permissions
RUN /bin/sh -c set -eux; \
  mkdir -p /workspace /home/node/.claude /home/node/.config/.wrangler; \
  chown -R node:node /workspace /home/node/.claude /home/node/.config

WORKDIR /workspace

# Set up non-root user
USER node

# Install global packages
ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

# Set the default shell to zsh rather than sh
ENV SHELL=/bin/zsh

# Set the default editor and visual
ENV EDITOR=nano
ENV VISUAL=nano

# Default theme
ARG ZSH_IN_DOCKER_VERSION=1.2.0
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v${ZSH_IN_DOCKER_VERSION}/zsh-in-docker.sh)" -- \
  -t robbyrussell \
  -p colored-man-pages \
  -p git \
  -p yarn \
  -p https://github.com/targendaz2/taskfile \
  -p https://github.com/zsh-users/zsh-syntax-highlighting \
  -a "export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
  -x

# Install Claude
RUN npm install -g @anthropic-ai/claude-code@${CLAUDE_CODE_VERSION}


# Copy and set up firewall script
COPY init-firewall.sh /usr/local/bin/
USER root
RUN /bin/sh -c set -eux; \
  chmod +x /usr/local/bin/init-firewall.sh; \
  echo "node ALL=(root) NOPASSWD: /usr/local/bin/init-firewall.sh" > /etc/sudoers.d/node-firewall; \
  chmod 0440 /etc/sudoers.d/node-firewall
USER node
