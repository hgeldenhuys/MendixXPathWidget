declare const mx;
declare const define;
declare const require;
declare const dojo;
declare const mxui;

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",
    "dojo/on",

    "dojo/text!XPath/widget/template/XPath.html",
    "XPath/widget/lib/Constructor",
    "dijit/form/FilteringSelect",
    "dojo/store/Memory",
    "dojo/dom-construct",
    "dijit"
], (declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, lang, dojoText, dojoHtml, dojoEvent, dojoOn, widgetTemplate, xConstructor, FilteringSelect, Memory, domConstruct, dijit, somethingsWrong) => {
    "use strict";
    dom.addCss(require.toUrl("XPath/widget/ui/XPath.css"));
    const xpaths = window[`xpaths`];
    const XPath = xpaths.XPath;
    const XPathEntity = xpaths.XPathEntity;
    const XPathAttribute = xpaths.XPathAttribute;
    const XPathAssociation = xpaths.XPathAssociation;
    const XPathMember = xpaths.XPathMember;
    const Entity = xpaths.Entity;
    const Attribute = xpaths.Attribute;
    const Association = xpaths.Association;
    const RenderToken = xpaths.RenderToken;
    const RenderExpression = xpaths.RenderExpression;
    const RenderParameter = xpaths.RenderParameter;
    const Render = xpaths.Render;
    const EmptyParameter = xpaths.EmptyParameter;
    const domain = xpaths.domain;
    const ExpressionType = xpaths.ExpressionType;
    const Expression = xpaths.Expression;
    const renderExpression = xpaths.RenderExpression;
    const Condition = xpaths.Condition;
    const EnumParameter = xpaths.EnumParameter;
    const BlankParameter = xpaths.BlankParameter;
    const LiteralParameter = xpaths.LiteralParameter;
    const DataType = xpaths.DataType;
    const getFriendlyRenderExpression = xpaths.getFriendlyRenderExpression;

    const dojoImports = {
        _initialized: false,
        entityStore: null,
        expressionStore: null,
        init: (entityStore, expressionStore) => {
            if (!dojoImports._initialized) {
                dojoImports.entityStore = entityStore;
                dojoImports.expressionStore = expressionStore;
                let conditionLevel = 0;
                let conditionEntity = '';
                let expressionClassValue = '';
                const conditionClass = () => {
                    return `${conditionEntity.replace('.', '_')}-${conditionLevel}${expressionClassValue.replace('.', '_')}`;
                };
                // Render
                Render.prototype.renderDom = (widget: any, parentDom: any) => {
                    dojo.place(cr(`td`, {style: "color: red;"}, `Not implemented for`, cr(`span`, {style: `font-weight: bold`}, ` ${functionName(widget.__proto__.constructor)}`)), parentDom);
                    console.error(`Implement me!`);
                };
                // XPath
                XPath.prototype.renderDom = (render: Render, parentDom: any) => {
                    const xPath: XPath = render as XPath;
                    const guid: string = xPath.id;
                    const fullDom = cr(`span`, {class: `full-name`}, `//`);
                    const readWriteWidget = newReadWriteWidget(guid, fullDom, `x-path`, true);
                    const entityTD = cr(`td`, {class: `x-path-cell ${conditionClass()}`}, readWriteWidget);
                    const entityRow = cr(`tr`, {class: `x-path-row`}, entityTD);
                    const entityTable = cr(`table`, {class: `x-path-browser ${conditionClass()}`}, entityRow);
                    dojo.place(entityTable, parentDom);
                    newSelection(guid, dojo.hitch(render, (selectId: string, xpathSelected: XPath, evt) => {
                        xpathSelected.setEntity(dijit.byId(selectId).get('value'));
                    }, `${guid}-selector`, xPath), dojo.hitch(this, () => {
                        //
                    }), xPath.rootEntity && xPath.rootEntity.entityName, entityTD, dojoImports.entityStore, false);
                    if (xPath.rootEntity) {
                        xPath.rootEntity.renderDom(xPath.rootEntity, entityRow);
                    }
                };
                // XPathEntity
                XPathEntity.prototype.renderDom = (xPathEntity: XPathEntity, parentDom: any) => {
                    const guid: string = xPathEntity.id;
                    const moduleName = xPathEntity.entityName.split('.')[0];
                    const entityName = xPathEntity.entityName.split('.')[1];
                    const entityDom = cr(`span`, {title: `${xPathEntity.entityName}`, class: `entity-name`}, entityName);
                    const fullDom = cr(`span`, {title: `${moduleName}.${entityName}`, class: `full-name`}, entityDom);
                    const entityTD = cr(`td`, {class: `x-path-entity-cell ${conditionClass()}`}, fullDom);
                    const addConditionDom = cr(`td`, {class: `x-path-add-condition`, title: `Add condition`}, `+`);
                    dojoOn(addConditionDom, 'click', dojo.hitch(xPathEntity, (entity: XPathEntity) => {
                        entity.addCondition();
                    }, xPathEntity));
                    dojo.place(entityTD, parentDom);
                    dojo.place(addConditionDom, parentDom);
                    if (xPathEntity.hasConditions()) {
                        const conditionTd = cr(`td`, {class: `x-path-conditions ${conditionClass()}`});
                        dojo.place(conditionTd, parentDom);
                        const conditionTable = cr(`table`, {class: `x-path-condition-table ${conditionClass()}`});
                        dojo.place(conditionTable, conditionTd);
                        xPathEntity.conditions.forEach((condition) => {
                            conditionEntity += ` c-${condition.id}`;
                            conditionLevel += 1;
                            const leftConditionDom = cr(`td`, {class: `x-path-left-condition ${conditionClass()}`}, `[`);
                            const conditionDom = cr(`td`, {class: `x-path-left-condition ${conditionClass()}`});
                            const conditionRow = cr(`tr`, {class: `x-path-row`});
                            dojo.place(conditionRow, conditionTable);
                            dojo.place(leftConditionDom, conditionRow);
                            condition.renderDom(condition, conditionRow);
                            const rightConditionDom = cr(`td`, {class: `x-path-right-condition ${conditionClass()}`}, `]`);
                            const removeConditionDom = cr(`td`, {class: `x-path-remove-condition`, title: `Remove Condition`}, `X`);
                            dojo.place(conditionDom, conditionRow);
                            dojo.place(rightConditionDom, conditionRow);
                            dojo.place(removeConditionDom, conditionRow);
                            dojoOn(removeConditionDom, 'click', dojo.hitch(this, (entity: XPathEntity, selectedCondition) => {
                                entity.removeCondition(condition);
                            }, xPathEntity, condition));

                            const underline = dojo.hitch(this, (level, evt) => {
                                const selector = `.${level.replace(/  /g, ' ').replace(/ /g, '.')}`;
                                dojo.query(selector).forEach((domSelected) => {
                                    dojo.addClass(domSelected, `condition-highlighted`);
                                });
                            }, conditionClass());
                            const clear = dojo.hitch(this, (level, evt) => {
                                const selector = `.${level.replace(/  /g, ' ').replace(/ /g, '.')}`;
                                dojo.query(selector).forEach((domSelected) => {
                                    dojo.removeClass(domSelected, `condition-highlighted`);
                                });
                            }, conditionClass());
                            dojoOn(leftConditionDom, 'mouseenter', underline);
                            dojoOn(rightConditionDom, 'mouseenter', underline);
                            dojoOn(leftConditionDom, 'mouseleave', clear);
                            dojoOn(rightConditionDom, 'mouseleave', clear);
                            conditionLevel -= 1;
                            conditionEntity = conditionEntity.replace(` c-${condition.id}`, '');
                        });
                    }
                    if (!xPathEntity.isRoot()) {
                        const member = xPathEntity.hasMember();
                        const continuePathRead = cr(`span`, {class: `x-path-continue-path${!!xPathEntity ? 'used' : ''}`}, `${!member ? '…' : '/'}`);
                        const continuePathWrite = newReadWriteWidget(`${guid}`, continuePathRead, `continue-xpath`, true);
                        const continuePathDom = cr(`td`, {class: ` ${conditionClass()}`}, continuePathWrite);
                        dojo.place(continuePathDom, parentDom);
                        newSelection(`${guid}`, dojo.hitch(xPathEntity, (selectId: string, entity: XPathEntity, value: string) => {
                            if (value === ``) {
                                entity.discardMember();
                            } else {
                                entity.useMember(value);
                            }
                        }, `${guid}-selector`, xPathEntity), dojo.hitch(this, () => {
                            //
                        }), xPathEntity.hasMember() && xPathEntity.member.plainValue(), continuePathDom, memberStore(xPathEntity), true);
                        if (xPathEntity.hasMember()) {
                            xPathEntity.member.renderDom(xPathEntity.member, parentDom);
                        }
                    }
                };
                // Condition
                Condition.prototype.renderDom = (condition: Condition, parentDom: any) => {
                    const guid: string = condition.id;
                    condition.expressions.forEach((expression) => {
                        expression.renderDom(expression, parentDom);
                    });
                    const addExressionButton = cr(`span`, {class: `add-expression-button`}, `+`);
                    const addExressionWrite = newReadWriteWidget(guid, addExressionButton, `add-expression`, true);
                    const expressionDom = cr(`td`, {class: `add-expression-td ${conditionClass()}`}, addExressionWrite);
                    dojo.place(expressionDom, parentDom);
                    newSelectionAutoComplete(guid, dojo.hitch(condition, (selectId: string, conditionSelected: Condition, evt: string) => {
                        const expressionType = dojoImports.expressionStore.query({id: evt})[0].type;
                        condition.addExpression(expressionType);
                    }, `${guid}-selector`, condition), '', addExressionWrite, dojoImports.expressionStore, true);
                };
                // Expression.
                Expression.prototype.renderDom = (expression: Expression, parentDom: any) => {
                    const guid: string = expression.id;
                    const highlightGuid = `expression-${guid}`;
                    expressionClassValue = expressionClassValue + ' ' + highlightGuid;
                    let expressionRead;
                    let template = renderExpression[expression.expressionType].xpathTemplate.replace(`(`, ``).replace(`)`, ``);
                    const hasParenthesis = expression.expressionType !== ExpressionType.Comma;
                    for (let idx = 0; idx < renderExpression[expression.expressionType].parameterCount; idx++) {
                        const parts = template.split("$" + idx);
                        // If there aren't any clickable text for the function
                        if (idx === 0) {
                            if (parts[0] === "") {
                                expressionRead = cr("span", {class: "x-path-expression-part select"}, " ƒ ");
                            } else {
                                expressionRead = cr("span", {class: "x-path-expression-part"}, ` ${parts[0]}`);
                            }
                            const expressionWrite = newReadWriteWidget(guid, expressionRead, `set-expression`, true);
                            const expressionTd = cr("td", {class: `x-path-expression-parts ${conditionClass()}`}, expressionWrite);

                            dojoOn(expressionTd, 'mouseenter', dojo.hitch(this, (domOn, queryGuid, evt) => {
                                domOn.querySelectorAll(`.${queryGuid}`).forEach((subDom) => {
                                    dojo.addClass(subDom, 'condition-highlighted');
                                });
                            },  parentDom, highlightGuid));
                            dojoOn(expressionTd, 'mouseleave', dojo.hitch(this, (domOn, queryGuid, evt) => {
                                domOn.querySelectorAll(`.${queryGuid}`).forEach((subDom) => {
                                    dojo.removeClass(subDom, 'condition-highlighted');
                                });
                            },  parentDom, highlightGuid));
                            dojo.place(expressionTd, parentDom);
                            const valueId = dojoImports.expressionStore.query({type: expression.expressionType})[0].id;
                            newSelectionAutoComplete(`${guid}`, dojo.hitch(expression, (selectId: string, selectedExpression: Expression, value: string) => {
                                if (value === `remove-expression`) {
                                    expression.getCondition().removeExpression(expression);
                                } else {
                                    const newValue = dojoImports.expressionStore.query({id: value})[0].type;
                                    expression.getCondition().setExpression(selectedExpression, newValue as ExpressionType);
                                }
                            }, `${guid}-selector`, expression), valueId, expressionWrite, dojoImports.expressionStore, true);
                            template = parts[1];
                            if (hasParenthesis) {
                                const leftParButton = cr(`td`, {class: `left-parenthesis ${conditionClass()} ${expression.getLeftParenthesis() ? 'selected' : ''}`}, ` (`);
                                dojo.place(leftParButton, parentDom);
                                dojoOn(leftParButton, 'click', dojo.hitch(this, (selectedExpression: Expression, evt) => {
                                    selectedExpression.toggleLeftParenthesis();
                                }, expression));
                            }
                        }
                        const parameter = expression.parameters[`${idx}`];
                        parameter.renderDom(parameter, parentDom);
                        if (parts[1] && (!(parameter instanceof BlankParameter))) {
                            dojo.place(cr("td", {class: `x-path-expression-part-etc index-${idx}`}, parts[1].split('$')[0]), parentDom);
                        }
                    }
                    if (renderExpression[expression.expressionType].parameterCount === 0) {
                        expressionRead = cr("span", {class: "x-path-expression-part"}, renderExpression[expression.expressionType].xpathTemplate.replace(`(`, ``).replace(`)`, ``));
                        const expressionWrite = newReadWriteWidget(guid, expressionRead, `set-expression`, true);
                        const expressionTd = cr("td", {class: `x-path-expression-parts ${conditionClass()}`}, expressionWrite);
                        dojo.place(expressionTd, parentDom);
                        const valueId = dojoImports.expressionStore.query({type: expression.expressionType})[0].id;
                        newSelectionAutoComplete(`${guid}`, dojo.hitch(expression, (selectId: string, selectedExpression: Expression, value: string) => {
                            if (value === `remove-expression`) {
                                expression.getCondition().removeExpression(expression);
                            } else {
                                const newValue = dojoImports.expressionStore.query({id: value})[0].type;
                                expression.getCondition().setExpression(selectedExpression, newValue as ExpressionType);
                            }
                        }, `${guid}-selector`, expression), valueId, expressionWrite, dojoImports.expressionStore, true);
                        if (hasParenthesis) {
                            const leftParButton = cr(`td`, {class: `left-parenthesis ${conditionClass()} ${expression.getLeftParenthesis() ? 'selected' : ''}`}, ' (');
                            dojo.place(leftParButton, parentDom);
                            dojoOn(leftParButton, 'click', dojo.hitch(this, (selectedExpression: Expression, evt) => {
                                selectedExpression.toggleLeftParenthesis();
                            }, expression));
                        }
                    }
                    if (hasParenthesis) {
                        const rightParButton = cr(`td`, {class: `right-parenthesis ${conditionClass()} ${expression.getRightParenthesis() ? 'selected' : ''}`}, ') ');
                        dojo.place(rightParButton, parentDom);
                        dojoOn(rightParButton, 'click', dojo.hitch(this, (selectedExpression: Expression, evt) => {
                            selectedExpression.toggleRightParenthesis();
                        }, expression));
                    }
                    expressionClassValue = expressionClassValue.replace(' ' + highlightGuid, '');
                };
                const getPreviousExpressionEnums = (parameter: RenderParameter) => {
                    // If the previous parameter was an enum, add it's values to this parameter
                    let enumerationValues = [];
                    if ((parameter instanceof XPathAttribute) && (parameter.getParent() instanceof XPathEntity)) {
                        const attribute = parameter as XPathAttribute;
                        const xpathEntity = attribute.getParent() as XPathEntity;
                        if (!xpathEntity) {
                            return [];
                        }
                        if (attribute.getDataType() === DataType.Enum) {
                            enumerationValues = xpathEntity.getEntity().mxEntity.getEnumMap(attribute.attribute.qualifiedName);
                        }
                    } else {
                        const expressionIndex = (parameter.getParent() as Expression).myIndex();
                        const xpathEntity = (parameter.getParent() as Expression).getXPathEntity();
                        const condition = (parameter.getParent() as Expression).getCondition();
                        if (expressionIndex > 0) {
                            const previousExpression: Expression = condition.expressions[expressionIndex - 1];
                            if (previousExpression.parameters[0] instanceof XPathAttribute) {
                                const attribute = previousExpression.parameters[0] as XPathAttribute;
                                if (attribute.getDataType() === DataType.Enum) {
                                    const enumerations = xpathEntity.getEntity().mxEntity.getEnumMap(attribute.attribute.qualifiedName);
                                    enumerationValues = enumerations;
                                }
                            } else if (previousExpression.parameters[0] instanceof XPathAssociation) {
                                const attribute = (previousExpression.parameters[0] as XPathAssociation).getAttributeAtTheEnd();
                                if (attribute && (attribute.getDataType() === DataType.Enum)) {
                                    enumerationValues = previousExpression.parameters[0].entity.getEntity().mxEntity.getEnumMap(attribute.attribute.qualifiedName);
                                }
                            }

                        }
                    }
                    enumerationValues.sort((a, b) => {
                        a = (a.caption + '').toString();
                        b = (b.caption + '').toString();
                        if (a > b) {
                            return 1;
                        }
                        if (a < b) {
                            return -1;
                        }
                        return 0;
                    });
                    return enumerationValues;
                };
                const renderParameter = (parameter: RenderParameter, parentDom: any, parameterDom: any, guid: string, parameterWrite: any) => {
                    const xPathEntity = parameter.getEntityOwner();
                    dojo.place(parameterDom, parentDom);
                    const parent = parameter.getParent();
                    let selectedValue = parameter.plainValue();
                    if (parameter instanceof XPathAttribute) {
                        selectedValue = (parameter as XPathAttribute).attribute.qualifiedName;
                    } else if (parameter instanceof XPathAssociation) {
                        selectedValue = (parameter as XPathAssociation).getAssociation().qualifiedName;
                    } else if (parameter instanceof LiteralParameter) {
                        selectedValue = `LiteralParameter`;
                    } else if (parameter instanceof EnumParameter) {
                        const enumParameter = parameter as EnumParameter;
                        selectedValue = enumParameter.value;
                    }
                    const parameters = dojoImports.getParameterPossibilities(xPathEntity, getPreviousExpressionEnums(parameter));
                    newSelection(`${guid}`, dojo.hitch(parameter, (selectId: string, parameterSelected: RenderParameter, parentSelected: Render, allParameters: any, evt: string) => {
                        const selection = allParameters.query({id: evt})[0];
                        if (parentSelected instanceof Expression) {
                            const expressionSelected = parentSelected as Expression;
                            if (selection.type === `EmptyParameter`) {
                                expressionSelected.setEmptyParameter(parameterSelected);
                            } else if (selection.type === `RenderToken`) {
                                expressionSelected.setTokenParameter(parameterSelected, evt as Token);
                            } else if (selection.type === `XPathAttribute`) {
                                expressionSelected.setAttributeParameter(parameterSelected, evt);
                            } else if (selection.type === `XPathAssociation`) {
                                expressionSelected.setAssociationParameter(parameterSelected, evt);
                            } else if (selection.type === `LiteralParameter`) {
                                expressionSelected.setLiteralParameter(parameterSelected, ``);
                            } else if (selection.type === `EnumParameter`) {
                                expressionSelected.setEnumParameter(parameterSelected, selection.id);
                            } else if (selection.type === `BlankParameter`) {
                                expressionSelected.setBlankParameter(parameterSelected);
                            } else {
                                console.log(`Bloop!`);
                            }
                        } else if (parentSelected instanceof XPathEntity) {
                            const xPathEntityParent = parentSelected as XPathEntity;
                            xPathEntityParent.useMember(evt);
                        }
                    }, `${guid}-selector`, parameter, parent, parameters), dojo.hitch(this, (selectId: string, parameterSelected: RenderParameter, parentSelected: Render) => {
                        const expressionSelected = parentSelected as Expression;
                        const widget = dijit.byId(selectId);
                        const inputValue = widget.domNode.querySelectorAll('input')[2].value;
                        expressionSelected.setLiteralParameter(parameterSelected, inputValue);
                    }, `${guid}-selector`, parameter, parent), selectedValue, parameterWrite, parameters, false);
                };
                // BlankParameter
                BlankParameter.prototype.renderDom = (blankParameter: BlankParameter, parentDom: any) => {
                    const guid: string = blankParameter.id;
                    const blankParameterRead = cr(`span`, {class: `x-path-parameter blank-parameter`}, `?`);
                    const blankParameterWrite = newReadWriteWidget(guid, blankParameterRead, `blank-parameter`, true);
                    const blankDom = cr(`td`, {class: `empty-parameter-td ${conditionClass()}`}, blankParameterWrite);
                    renderParameter(blankParameter, parentDom, blankDom, guid, blankParameterWrite);
                };
                // EmptyParameter
                EmptyParameter.prototype.renderDom = (emptyParameter: EmptyParameter, parentDom: any) => {
                    const guid: string = emptyParameter.id;
                    const emptyParameterRead = cr(`span`, {class: `x-path-parameter empty-parameter`}, `empty`);
                    const emptyParameterWrite = newReadWriteWidget(guid, emptyParameterRead, `empty-parameter`, true);
                    const emptyDom = cr(`td`, {class: `empty-parameter-td ${conditionClass()}`}, emptyParameterWrite);
                    renderParameter(emptyParameter, parentDom, emptyDom, guid, emptyParameterWrite);
                };
                // XPathAttribute
                XPathAttribute.prototype.renderDom = (xPathAttribute: XPathAttribute, parentDom: any) => {
                    const guid: string = xPathAttribute.id;
                    const xPathAttributeRead = cr(`span`, {class: `x-path-parameter attribute-parameter`}, xPathAttribute.plainValue().replace('/', ''));
                    const xPathAttributeWrite = newReadWriteWidget(guid, xPathAttributeRead, `attribute-parameter`, true);
                    const emptyDom = cr(`td`, {class: `attribute-parameter-td ${conditionClass()}`}, xPathAttributeWrite);
                    renderParameter(xPathAttribute, parentDom, emptyDom, guid, xPathAttributeWrite);
                };
                // XPathAssociation
                XPathAssociation.prototype.renderDom = (xPathAssociation: XPathAssociation, parentDom: any) => {
                    const guid: string = xPathAssociation.id;
                    const module: string = xPathAssociation.plainValue().split('.')[0];
                    const associationName: string = xPathAssociation.plainValue().split('.')[1].split('/')[0];
                    const xPathAssociationRead = cr(`span`, {class: `x-path-parameter association-parameter`, title: xPathAssociation.associationName}, associationName);
                    const xPathAssociationWrite = newReadWriteWidget(guid, xPathAssociationRead, `association-parameter`, true);
                    const emptyDom = cr(`td`, {class: `association-parameter-td ${conditionClass()}`}, xPathAssociationWrite);
                    renderParameter(xPathAssociation, parentDom, emptyDom, guid, xPathAssociationWrite);
                    if (!xPathAssociation.usingEntity()) {
                        const continuePath = cr(`td`, {class: `continue-path`}, '/…');
                        dojo.place(continuePath, parentDom);
                        dojoOn(continuePath, 'click', dojo.hitch(this, (associationSelected: XPathAssociation, event) => {
                            associationSelected.useEntity();
                        }, xPathAssociation));
                    } else {
                        const continuePath = cr(`td`, {class: `remove-path ${conditionClass()}`}, '/');
                        dojo.place(continuePath, parentDom);
                        dojoOn(continuePath, 'click', dojo.hitch(this, (associationSelected: XPathAssociation, event) => {
                            associationSelected.discardEntity();
                        }, xPathAssociation));
                        xPathAssociation.entity.renderDom(xPathAssociation.entity, parentDom);
                    }
                };
                // RenderToken
                RenderToken.prototype.renderDom = (renderToken: RenderToken, parentDom: any) => {
                    const guid: string = renderToken.id;
                    const value = renderToken.plainValue().replace(/'/g, ``).replace(/\[/g, ``).replace(/\]/, ``).replace(/%/g, ``);
                    const renderTokenRead = cr(`span`, {class: `x-path-parameter token-parameter ${conditionClass()}`}, value);
                    const renderTokenWrite = newReadWriteWidget(guid, renderTokenRead, `token-parameter`, true);
                    const tokenDom = cr(`td`, {class: `token-parameter-td`}, renderTokenWrite);
                    renderParameter(renderToken, parentDom, tokenDom, guid, renderTokenWrite);
                };
                // LiteralParameter.
                LiteralParameter.prototype.renderDom = (literalParameter: LiteralParameter, parentDom: any) => {
                    const guid: string = literalParameter.id;
                    const literalParameterRead = cr(`span`, {class: `x-path-parameter literal-parameter-edit`}, `▼`);
                    const literalParameterWrite = newReadWriteWidget(guid, literalParameterRead, `literal-parameter`, true);
                    const literalDom = cr(`td`, {class: `literal-parameter-td ${conditionClass()}`}, literalParameterWrite);
                    renderParameter(literalParameter, parentDom, literalDom, guid, literalParameterWrite);
                    const inputRead = cr(`span`, {class: `literal-input-display ${literalParameter.getDataType()} ${conditionClass()}`}, ` ${literalParameter.renderXPath()} `);
                    const inputWrite = newReadWriteWidget(`${guid}-input`, inputRead, `literal-input`, true);
                    const input = inputWrite.querySelector('input');
                    const inputWriteTD = cr(`td`, {class: ` ${conditionClass()}`}, inputWrite);
                    input.value = literalParameter.value;
                    input.type = `text`;
                    input.className = `form-control`;
                    dojo.place(inputWriteTD, parentDom);
                    const onChange = dojo.hitch(literalParameter, (param: LiteralParameter, inputSelected: any, event: any) => {
                        literalParameter.setValue(inputSelected.value);
                    }, literalParameter, input);
                    dojoOn(input, 'change', onChange);
                    const helper = new ReadWriteHelper(inputWrite.querySelector(`.read-widget`), inputWrite.querySelector(`.read-wrapper`), inputWrite.querySelector(`.write-wrapper`), input, true, dijit.byId(`${guid}-input-selector`));
                };
                // EnumParameter.
                EnumParameter.prototype.renderDom = (enumParameter: EnumParameter, parentDom: any) => {
                    const guid: string = enumParameter.id;
                    const literalParameterRead = cr(`span`, {class: `x-path-parameter enum-parameter-edit`}, `▼`);
                    const literalParameterWrite = newReadWriteWidget(guid, literalParameterRead, `enum-parameter`, true);
                    const literalDom = cr(`td`, {class: `token-parameter-td ${conditionClass()}`}, literalParameterWrite);
                    renderParameter(enumParameter, parentDom, literalDom, guid, literalParameterWrite);
                    const enums = getPreviousExpressionEnums(enumParameter);
                    let value = enumParameter.value;
                    enums.forEach((enum_) => {
                        if (enum_.key === value) {
                            value = enum_.caption;
                        }
                    });
                    const inputRead = cr(`span`, {class: `enum-input-display ${enumParameter.getDataType()} ${conditionClass()}`}, ` ${value} `);
                    const inputWrite = newReadWriteWidget(`${guid}-input`, inputRead, `enum-input`, true);
                    const input = inputWrite.querySelector('input');
                    const inputWriteTD = cr(`td`, {class: ` ${conditionClass()}`}, inputWrite);
                    input.value = enumParameter.value;
                    input.type = `text`;
                    input.className = `form-control`;
                    dojo.place(inputWriteTD, parentDom);
                    const onChange = dojo.hitch(enumParameter, (param: LiteralParameter, inputSelected: any, event: any) => {
                        enumParameter.setValue(inputSelected.value);
                    }, enumParameter, input);
                    dojoOn(input, 'change', onChange);
                    const helper = new ReadWriteHelper(inputWrite.querySelector(`.read-widget`), inputWrite.querySelector(`.read-wrapper`), inputWrite.querySelector(`.write-wrapper`), input, true, dijit.byId(`${guid}-input-selector`));
                };
            }
        },
        getParameterPossibilities(xpathEntity: XPathEntity, enumParams: any[] = []) {
            const parameters: Array<{display: string, name: string, id: string, type: string, association?: string | null, associationDisplay?: string | null}> = [];
            enumParams.forEach((enumParam) => {
                parameters.push({display: `<span class="expression-enum" title="${enumParam.key}">${enumParam.caption}</span>`, name: enumParam.caption, id: enumParam.key, type: `EnumParameter`});
            });
            parameters.push({display: '<span class="expression-empty"></span>', name: ``, id: `Blank`, type: `BlankParameter`});
            parameters.push({display: '<span class="expression-empty">empty value</span>', name: `empty value`, id: `empty`, type: `EmptyParameter`});
            parameters.push({display: '<span class="expression-literal">Variable</span>', name: `Variable`, id: `Variable`, type: `LiteralParameter`});
            xpathEntity.getEntity().attributeNames.forEach((member) => {
                const memberName = member.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                parameters.push({display: `<span class="expression-attribute">${memberName}</span>`, name: memberName, id: member, type: `XPathAttribute`});
            });
            xpathEntity.getEntity().associationNames.forEach((member) => {
                const module = member.split('.')[0].replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace("_", ' ');
                const association = domain.associations[member];
                const entity = association.otherEntity(xpathEntity.entityName);
                const associationName = member.split('.')[1].replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace("_", ' ');
                parameters.push({display: `<span class="expression-association">${associationName}</span> in ${module}`, name: associationName, id: member, type: `XPathAssociation`, association: associationName, associationDisplay: `<span class="expression-association">${associationName}</span>`});
            });
            xpathEntity.getEntity().associationNames.forEach((member) => {
                const module = member.split('.')[0].replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace("_", ' ');
                const association = domain.associations[member];
                const entity = association.otherEntity(xpathEntity.entityName);
                const associationName = member.split('.')[1].replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase()).replace("_", ' ');
                parameters.push({display: `<span class="expression-association">${associationName}</span> in ${module}`, name: associationName, id: member, type: `XPathAssociation`, association: associationName, associationDisplay: `<span class="expression-association">${associationName}</span>`});
            });
            parameters.push({display: '<span class="expression-token">Current Date Time</span>', name: `Current Date Time`, id: "'[%CurrentDateTime%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Day</span>', name: `Begin Of Current Day`, id: "'[%BeginOfCurrentDay%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Day UTC</span>', name: `Begin Of Current Day UTC`, id: "'[%BeginOfCurrentDayUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Hour</span>', name: `Begin Of Current Hour`, id: "'[%BeginOfCurrentHour%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Hour UTC</span>', name: `Begin Of Current Hour UTC`, id: "'[%BeginOfCurrentHourUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Minute</span>', name: `Begin Of Current Minute`, id: "'[%BeginOfCurrentMinute%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Minute UTC</span>', name: `Begin Of Current Minute UTC`, id: "'[%BeginOfCurrentMinuteUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Month</span>', name: `Begin Of Current Month`, id: "'[%BeginOfCurrentMonth%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Month UTC</span>', name: `Begin Of Current Month UTC`, id: "'[%BeginOfCurrentMonthUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Week</span>', name: `Begin Of Current Week`, id: "'[%BeginOfCurrentWeek%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Week UTC</span>', name: `Begin Of Current Week UTC`, id: "'[%BeginOfCurrentWeekUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Year</span>', name: `Begin Of Current Year`, id: "'[%BeginOfCurrentYear%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">Begin Of Current Year UTC</span>', name: `Begin Of Current Year UTC`, id: "'[%BeginOfCurrentYearUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Day</span>', name: `End Of Current Day`, id: "'[%EndOfCurrentDay%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Day UTC</span>', name: `End Of Current Day UTC`, id: "'[%EndOfCurrentDayUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Hour</span>', name: `End Of Current Hour`, id: "'[%EndOfCurrentHour%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Hour UTC</span>', name: `End Of Current Hour UTC`, id: "'[%EndOfCurrentHourUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Minute</span>', name: `End Of Current Minute`, id: "'[%EndOfCurrentMinute%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Minute UTC</span>', name: `End Of Current Minute UTC`, id: "'[%EndOfCurrentMinuteUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Month</span>', name: `End Of Current Month`, id: "'[%EndOfCurrentMonth%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Month UTC</span>', name: `End Of Current Month UTC`, id: "'[%EndOfCurrentMonthUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Week</span>', name: `End Of Current Week`, id: "'[%EndOfCurrentWeek%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Week UTC</span>', name: `End Of Current Week UTC`, id: "'[%EndOfCurrentWeekUTC%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Year</span>', name: `End Of Current Year`, id: "'[%EndOfCurrentYear%]'", type: `RenderToken`});
            parameters.push({display: '<span class="expression-token">End Of Current Year UTC</span>', name: `End Of Current Year UTC`, id: "'[%EndOfCurrentYearUTC%]'", type: `RenderToken`});
            return new Memory({data: parameters});
        }
    };

    class ReadWriteHelper {
        // Creates events around the read- and write-widget.
        public writeDisplay: string;
        public readDisplay: string;
        public events: any[];
        public constructor(public readWidget: any, public readWrapper: any, public writeWrapper: any, public writeFocus: any, public hideRead: boolean, public selector: any) {
            this.writeDisplay = dojoStyle.get(writeWrapper, "display");
            this.readDisplay = dojoStyle.get(readWrapper, "display");
            this.events = [];
            this.read();
            this.events.push(dojoOn(writeFocus, "change", dojo.hitch(this, (event) => {
                this.read();
            })));
            this.events.push(dojoOn(writeFocus, "blur", dojo.hitch(this, (event) => {
                setTimeout(() => {
                    this.read();
                }, 400);
            })));
            this.events.push(dojoOn(readWidget, "click", dojo.hitch(this, (event) => {
                this.write();
                this.writeFocus.focus();
                this.writeFocus.select();
                try {
                    this.selector.openDropDown();
                } catch (e) {
                    //
                }
            })));
        }
        public read() {
            dojoStyle.set(this.writeWrapper, "display", "none");
            dojoStyle.set(this.readWrapper, "display", this.readDisplay);
        }
        public write() {
            dojoStyle.set(this.writeWrapper, "display", this.writeDisplay);
            if (this.hideRead) {
                dojoStyle.set(this.readWrapper, "display", "none");
            }
        }
        public destroy() {
            this.events.forEach((event) => {
                dojo.disconnect(event);
            });
        }
    }

    const getEntityMemoryList = () => {
        const friendlyEntityNames: Array<{name: string, id: string, display: string}> = [];
        const colourMap = {};
        let colourIndex = 0;
        let line = false;
        domain.entityNames.forEach((qualifiedName) => {
            const moduleName = qualifiedName.split('.')[0];
            const entityName = qualifiedName.split('.')[1];
            if (!colourMap[moduleName]) {
                colourIndex += 1;
                colourMap[moduleName] = `color-${colourIndex}`;
                line = true;
            }
            friendlyEntityNames.push({name: `${entityName} - ${moduleName}`, id: qualifiedName, display: `<div class="">${entityName}<span style="float: right; font-weight: bold;" class="${colourMap[moduleName]}">${moduleName}</span></div>`});
            line = false;
        });
        return new Memory({data: friendlyEntityNames});
    };

    const generateNewGuid = () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    const cr = mxui.dom.create;

// Constructs the path Element of an XPath entity
    const newReadWriteWidget = (guid: string, readDom: any, widgetClass: string, clickable: boolean) => {
        // const guid: string = generateNewGuid();
        const read = cr(`span`, {class: `${widgetClass} read-widget`, id: `${guid}-read`}, readDom);
        const write = cr(`input`, {class: `${widgetClass} write-widget`, id: `${guid}-write`});
        const readWrapper = cr(`span`, {class: `${widgetClass} read-wrapper`}, read);
        const writeWrapper = cr(`span`, {class: `${widgetClass} write-wrapper`}, write);
        const container = cr(`span`, {class: `${widgetClass} rw-container`, id: guid}, readWrapper, writeWrapper);
        container.setAttribute('clickable', clickable);
        return container;
    };

    const memberStore = (xPathEntity: XPathEntity) => {
        const friendlyNames: Array<{name: string, id: string, display: string}> = [];
        const entity: Entity = xPathEntity.getEntity();
        entity.attributeNames.sort().forEach((attributeName) => {
            const attribute: Attribute = entity.attributes[attributeName];
            friendlyNames.push({name: attributeName, id: attributeName, display: `<span title="${attribute.dataType}" class="attribute-name-list">${attributeName}</span><span class="data-type-list ${attribute.dataType}">${attribute.dataType}</span>`});
        });
        entity.associationNames.sort().forEach((associationName) => {
            const association: Association = entity.getAssociation(associationName);
            friendlyNames.push({
                display: `<span title="${association.otherEntity(entity.qualifiedName)}" class="association-name-list">${associationName.split('.')[1]}</span><span class="association-list">${association.otherEntity(entity.qualifiedName).split('.')[1]}</span>`,
                id: associationName,
                name: associationName
            });
        });
        friendlyNames.push({
            display: `<span title="Remove entity" class="association-name-list">~no selection~</span><span class="association-list">remove</span>`,
            id: `remove-selection`,
            name: `remove-selection`
        });
        return new Memory({data: friendlyNames});
    };

    const newSelection = (elementId: string, callback: any, errorCallback: any, selectValue: string, domSelection: any, valueStore, hideRead: boolean) => {
        console.log(`selectValue = ${selectValue}`);
        const oldWidget = dijit.byId(`${elementId}-selector`);
        if (oldWidget) {
            oldWidget.destroy();
        }
        new FilteringSelect({
            autoComplete: false,
            class: "form-control inline-dropdown ",
            id: `${elementId}-selector`,
            invalidMessage: `Invalid selection. Will use literal value instead`,
            labelAttr: "display",
            labelType: "html",
            name: `${elementId}-selector`,
            onBlur: dojo.hitch(this, (id: any) => {
                const widget = dijit.byId(id);
                if (widget.state === "Error") {
                    errorCallback();
                }
            }, `${elementId}-selector`),
            onChange: callback,
            onKeyPress: dojo.hitch(this, (event: any) => {
                console.log(`event=${event}`);
            }),
            onSearch: dojo.hitch(this, (results: any, query: string, options: any) => {
                console.log(`results=${results}`);
                console.log(`query=${query}`);
                console.log(`options=${options}`);
            }),
            onShow: dojo.hitch(this, (id, evt) => {
                console.log(`SHOW`);
            }, `${elementId}-selector`),
            queryExpr: '*\${0}*',
            required: false,
            searchAttr: "name",
            store: valueStore,
            style: "position: absolute;",
            value: selectValue
        }, `${elementId}-write`).startup();
        return new ReadWriteHelper(domSelection.querySelector(`.read-widget`), domSelection.querySelector(`.read-wrapper`), domSelection.querySelector(`.write-wrapper`), dijit.byId(`${elementId}-selector`).domNode.querySelector(".dijitInputInner"), hideRead, dijit.byId(`${elementId}-selector`));
    };

    const newSelectionAutoComplete = (elementId: string, callback: any, selectValue: string, domSelection: any, valueStore, hideRead: boolean) => {
        console.log(`selectValue = ${selectValue}`);
        const oldWidget = dijit.byId(`${elementId}-selector`);
        if (oldWidget) {
            oldWidget.destroy();
        }
        new FilteringSelect({
            autoComplete: true,
            class: "form-control inline-dropdown ",
            id: `${elementId}-selector`,
            labelAttr: "display",
            labelType: "html",
            name: `${elementId}-selector`,
            onChange: callback,
            onSearch: dojo.hitch(this, (id, evt) => {
                console.log(`earch ${id}`);
            }, `${elementId}-selector`),
            required: false,
            searchAttr: "name",
            store: valueStore,
            style: "position: absolute;",
            value: selectValue
        }, `${elementId}-write`).startup();
        return new ReadWriteHelper(domSelection.querySelector(`.read-widget`), domSelection.querySelector(`.read-wrapper`), domSelection.querySelector(`.write-wrapper`), dijit.byId(`${elementId}-selector`).domNode.querySelector(".dijitInputInner"), hideRead, dijit.byId(`${elementId}-selector`));
    };
    dojoImports.init(getEntityMemoryList(), new Memory({data: getFriendlyRenderExpression()}));
    // Declare widget's prototype.
    return declare("XPath.widget.XPath", [ _WidgetBase, _TemplatedMixin ], {
        _alertDiv: null,
        _contextObj: null,
        _handles: null,
        _readOnly: false,
        entityQualifiedNameAttribute: "",
        filteringSelect: null,
        identitySelect: "entitySelect",
        jsonAttribute: "",
        templateString: widgetTemplate,
        xConstructor: xConstructor(),
        xPathAttribute: null,
        xPathWrapperNode: null,
        xpath: null,

        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor() {
            this._handles = [];
            this._xpathEntities = {};
            this.idCounter = 0;
        },
        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate() {
            if (this.readOnly || this.get("disabled") || this.readonly) {
              this._readOnly = true;
            }
            this._updateRendering();
            this._setupEvents();
        },
        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data
        update(obj, callback) {
            if (obj !== null) {
                try {
                    this.xpath = XPath.deserialize(obj.get(this.jsonAttribute));
                } catch (e) {
                    console.error(e);
                    this.xpath = new XPath();
                }
                this.xpath.events().addListener("update", dojo.hitch(this, () => {
                    // this._updateRendering();
                    this._contextObj.set(this.jsonAttribute, this.xpath.serialize());
                    try {
                        this._contextObj.set(this.xPathAttribute, this.xpath.renderXPath());
                    } catch (e) {
                        this._contextObj.set(this.xPathAttribute, e.toString());
                    }
                    this._updateRendering();
                }));
            }
            this.nodes = [];
            this._contextObj = obj;
            this._resetSubscriptions();
            this._updateRendering(callback); //  We're passing the callback to updateRendering to be called after DOM-manipulation
        },

        // mxui.widget._WidgetBase.enable is called when the widget should enable editing. Implement to enable editing if widget is input widget.
        enable() {
            console.log(this.id + ".enable");
        },

        // mxui.widget._WidgetBase.enable is called when the widget should disable editing. Implement to disable editing if widget is input widget.
        disable() {
            console.log(this.id + ".disable");
        },

        // mxui.widget._WidgetBase.resize is called when the page's layout is recalculated. Implement to do sizing calculations. Prefer using CSS instead.
        resize(box) {
            console.log(this.id + ".resize");
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize() {
            console.log(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        // We want to stop events on a mobile device.
        _stopBubblingEventOnMobile(e) {
            console.log(this.id + "._stopBubblingEventOnMobile");
            if (typeof document.ontouchstart !== "undefined") {
                dojoEvent.stop(e);
            }
        },

        // Attach events to HTML dom elements
        _setupEvents() {
            console.log(this.id + "._setupEvents");

        },

        _execMf(mf, guid, cb) {
            console.log(this.id + "._execMf");
            if (mf && guid) {
                mx.ui.action(mf, {
                    callback: lang.hitch(this, (objs) => {
                        if (cb && typeof cb === "function") {
                            cb(objs);
                        }
                    }),
                    error(error) {
                        console.debug(error.description);
                    },
                    params: {
                        applyto: "selection",
                        guids: [guid]
                    }
                }, this);
            }
        },
        // Rerender the interface.
        _updateRendering(callback) {

            // this.colorSelectNode.disabled = this._readOnly;
            if (this._contextObj !== null) {
                dojoStyle.set(this.domNode, "display", "block");
                dojo.empty(this.domNode);
                this.xpath.renderDom(this.xpath, this.domNode);
            } else {
                dojoStyle.set(this.domNode, "display", "none");
            }
            // Important to clear all validations!
            this._clearValidations();

            // The callback, coming from update, needs to be executed, to let the page know it finished rendering
            this._executeCallback(callback, "_updateRendering");
        },

        setExpression(addExpressionDom: any, expressionIndex: number = null) {
            const addExpressionDomId = addExpressionDom.id;
            const entityId = addExpressionDom.getAttribute("entityId");
            const xpathEntity: XPathEntity = this._xpathEntities[entityId];
            const condition = xpathEntity.conditions[parseInt(addExpressionDom.getAttribute("condition"), 10)];
            let useAdd = true;
            let defaultValue = '';
            let parameterIndex = 0;
            if (expressionIndex === null) {
                expressionIndex = parseInt(addExpressionDom.getAttribute("expression"), 10);
                parameterIndex = parseInt(addExpressionDom.getAttribute("parameter"), 10);
                defaultValue = condition.expressions[expressionIndex].parameters[parameterIndex].plainValue();
                useAdd = false;
            }
            const paramPossibilities = dojoImports.getParameterPossibilities(xpathEntity, this.getPreviousExpressionEnums(condition.expressions[expressionIndex].parameters[parameterIndex]));
            newSelection(addExpressionDomId, dojo.hitch(this, (id, selectedCondition: Condition, parameterStore: any, changedTo: string) => {
                console.log(`changedTo = ${changedTo}`);

                const selectedItem = parameterStore.query({id: changedTo})[0];
                const expression = useAdd ? selectedCondition.addExpression() : condition.expressions[expressionIndex];
                if (selectedItem.type === 'EmptyParameter') {
                    expression.setEmptyParameter(parameterIndex);
                } else if (selectedItem.type === 'RenderToken') {
                    expression.setTokenParameter(parameterIndex, changedTo as Token);
                } else if (selectedItem.type === 'XPathAttribute') {
                    expression.setAttributeParameter(parameterIndex, changedTo);
                } else if (selectedItem.type === 'XPathAssociation') {
                    const association = changedTo.split('/')[0];
                    const entity = !!changedTo.split('/')[1];
                    const parameter = expression.setAssociationParameter(parameterIndex, association);
                    if (entity) {
                        const useEntity = parameter.useEntity();
                    }
                } else {
                    throw new Error("Unsupported 2.");
                }
            }, `${addExpressionDomId}-selector`, condition, paramPossibilities), dojo.hitch(this, () => {
                //
            }), defaultValue, addExpressionDom, paramPossibilities, true);
        },
        // Handle validations.
        _handleValidation(validations) {
            console.log(this.id + "._handleValidation");
            this._clearValidations();
        },
        // Clear validations.
        _clearValidations() {
            dojoConstruct.destroy(this._alertDiv);
            this._alertDiv = null;
        },
        // Show an error message
        _showError(message) {
            console.log(this.id + "._showError");
            if (this._alertDiv !== null) {
                dojoHtml.set(this._alertDiv, message);
                return true;
            }
            this._alertDiv = dojoConstruct.create("div", {
                class: "alert alert-danger",
                innerHTML: message
            });
            dojoConstruct.place(this._alertDiv, this.domNode);
        },

        // Add a validation.
        _addValidation(message) {
            console.log(this.id + "._addValidation");
            this._showError(message);
        },

        // Reset subscriptions.
        _resetSubscriptions() {
            console.log(this.id + "._resetSubscriptions!");
            // Release handles on previous object, if any
            this.unsubscribeAll();

            // When a mendix object exists create subscribtions.
            if (this._contextObj) {
                this.subscribe({
                    callback: lang.hitch(this, (guid) => {
                        this._updateRendering();
                    }),
                    guid: this._contextObj.getGuid()
                });

                this.subscribe({
                    attr: this.entityQualifiedNameAttribute,
                    callback: lang.hitch(this, (guid, attr, attrValue) => {
                        this._updateRendering();
                    }),
                    guid: this._contextObj.getGuid()
                });

                this.subscribe({
                    attr: this.xPathAttribute,
                    callback: lang.hitch(this, (guid, attr, attrValue) => {
                        this._updateRendering();
                    }),
                    guid: this._contextObj.getGuid()
                });

                this.subscribe({
                    callback: lang.hitch(this, this._handleValidation),
                    guid: this._contextObj.getGuid(),
                    val: true
                });
            }
        },
        _executeCallback(cb, from) {
            if (cb && typeof cb === "function") {
                cb();
            }
        }
    });
});

require(["XPath/widget/XPath"]);
