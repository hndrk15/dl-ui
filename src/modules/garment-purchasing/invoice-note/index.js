export class Index {
    configureRouter(config, router) {
        config.map([
            { route: ['', 'list'], moduleId: './list', name: 'list', nav: false, title: 'List: Nota Invoice Garment' },
            { route: 'create', moduleId: './create', name: 'create', nav: false, title: 'Create: Nota Invoice Garment' },
            { route: 'view/:id', moduleId: './view', name: 'view', nav: false, title: 'View:  Nota Invoice Garment' },
            { route: 'edit/:id', moduleId: './edit', name: 'edit', nav: false, title: 'Edit: Nota Invoice Garment' },
        ]);

        this.router = router;
    }
}