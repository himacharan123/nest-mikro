'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-tut-project documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' : 'data-bs-target="#xs-controllers-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' :
                                            'id="xs-controllers-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' : 'data-bs-target="#xs-injectables-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' :
                                        'id="xs-injectables-links-module-AppModule-5f13fc83d790676cefefe30bb25d59680430b886a9d842afddef9277436f2654e251fdfa68255a6a6df37ead89e94c88e94fd566ed43a838d2b0d99a4cb83c50"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' :
                                            'id="xs-controllers-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' :
                                        'id="xs-injectables-links-module-AuthModule-aa04fb85ac5136cc30f13f8166d76a48f5b6a068e01d7f191c2e9494513d88ef0d1f42d75f15f4ce05e22bb9bb5103d78df9b93754f4eed095f3ddabf292979c"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' :
                                            'id="xs-controllers-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' :
                                        'id="xs-injectables-links-module-PostsModule-cb106be648ac330d617449a7e11c3fdbee8a287d1ea0e624819634f2db79103c3059cb2200c412e2c48944a6beef1c6b3805234a570a4cbc5a5ae5b216f5fb57"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' :
                                            'id="xs-controllers-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' :
                                        'id="xs-injectables-links-module-UsersModule-8d9de726255517e63dbe9b207787cbd4971d31b98ad6686b220a013b2a664347a0d3a319d3f1f60fe0962f55e51064cb33738add876690e5a186450da7fd9f80"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});