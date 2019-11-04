
post_install() {
	systemctl is-enabled nginx 2>&1 >/dev/null && systemctl -q try-reload-or-restart nginx
}

post_upgrade() {
	systemctl is-enabled nginx 2>&1 >/dev/null && systemctl -q try-reload-or-restart nginx
}

post_remove() {
	systemctl is-enabled nginx 2>&1 >/dev/null && systemctl -q try-reload-or-restart nginx
}
