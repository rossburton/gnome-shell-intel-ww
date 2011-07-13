UUID=intel-work-week@ross.burton.intel.com
FILES=extension.js metadata.json

all:
	@echo Nothing to do, try "make install-local" or "make install".

# Install for a single user
install-local:
	mkdir --parents ${HOME}/.local/share/gnome-shell/extensions/${UUID}
	cp ${FILES} ${HOME}/.local/share/gnome-shell/extensions/${UUID}

# Install for all users
install:
	mkdir --parents ${DESTDIR}/usr/share/gnome-shell/extensions/${UUID}
	cp ${FILES} ${DESTDIR}/usr/share/gnome-shell/extensions/${UUID}


dist:
	git archive --format=tar --prefix=gnome-shell-intel-ww-$(shell git describe)/ HEAD | gzip > gnome-shell-intel-ww-$(shell git describe).tar.gz
