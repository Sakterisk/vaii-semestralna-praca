FROM php:8.3-rc-fpm

ARG WWWGROUP

WORKDIR /var/www/html
ENV TZ=UTC

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update
RUN apt-get install -y \
    gnupg gosu curl ca-certificates zip unzip supervisor sqlite3 libpq-dev libzip-dev zlib1g-dev libpng-dev  \
    libonig-dev libicu-dev libssl-dev libxml2-dev libcap2-bin dh-python dnsutils librsvg2-bin fswatch
RUN curl -sLS https://getcomposer.org/installer | php -- --install-dir=/usr/bin/ --filename=composer \
    && docker-php-ext-configure intl \
    && docker-php-ext-install intl mbstring dom gd zip bcmath opcache pdo pdo_mysql \
    && apt-get -y autoremove  \
    && apt-get clean  \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN groupadd --force --gid $WWWGROUP sail  \
    && useradd -ms /bin/bash --no-user-group -g $WWWGROUP -u 1337 sail
COPY ./.ci/start-container /usr/local/bin/start-container
COPY ./.ci/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY ./.ci/php.ini /etc/php/8.3/cli/conf.d/99-sail.ini
RUN chmod +x /usr/local/bin/start-container
