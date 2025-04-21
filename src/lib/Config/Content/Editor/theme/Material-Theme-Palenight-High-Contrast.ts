import { IStandaloneThemeData } from "@/types/editor"

const PalenightHighContrast = {
    "inherit": true,
    "base": "vs-dark",
    "colors": {
        "focusBorder": "#FFFFFF00",
        "foreground": "#babed8",
        "button.background": "#717CB450",
        "button.foreground": "#ffffff",
        "dropdown.background": "#292D3E",
        "input.background": "#333747",
        "inputOption.activeBorder": "#babed830",
        "list.activeSelectionBackground": "#1B1E2B",
        "list.activeSelectionForeground": "#80CBC4",
        "list.dropBackground": "#f0717880",
        "list.focusBackground": "#babed820",
        "list.focusForeground": "#babed8",
        "list.highlightForeground": "#80CBC4",
        "list.hoverBackground": "#1B1E2B",
        "list.inactiveSelectionBackground": "#00000030",
        "activityBar.background": "#1B1E2B",
        "activityBar.dropBackground": "#f0717880",
        "activityBarBadge.background": "#80CBC4",
        "activityBarBadge.foreground": "#000000",
        "badge.background": "#00000030",
        "badge.foreground": "#676E95",
        "sideBar.background": "#1B1E2B",
        "sideBarSectionHeader.background": "#1B1E2B",
        "editorGroup.dropBackground": "#f0717880",
        "editorGroup.focusedEmptyBorder": "#f07178",
        "editorGroupHeader.tabsBackground": "#292D3E",
        "tab.border": "#292D3E",
        "tab.activeBorder": "#80CBC4",
        "tab.inactiveBackground": "#292D3E",
        "tab.activeModifiedBorder": "#757CA1",
        "tab.inactiveModifiedBorder": "#904348",
        "tab.unfocusedActiveModifiedBorder": "#c05a60",
        "tab.unfocusedInactiveModifiedBorder": "#904348",
        "editor.background": "#292D3E",
        "editor.foreground": "#babed8",
        "editorLineNumber.foreground": "#3A3F58",
        "editorLineNumber.activeForeground": "#757CA1",
        "editorCursor.foreground": "#FFCC00",
        "editor.selectionBackground": "#717CB450",
        "editor.selectionHighlightBackground": "#FFCC0020",
        "editor.wordHighlightBackground": "#ff9cac30",
        "editor.wordHighlightStrongBackground": "#C3E88D30",
        "editor.findMatchHighlight": "#babed8",
        "editor.findRangeHighlightBackground": "#FFCB6B30",
        "editor.lineHighlightBorder": "#00000000",
        "editor.rangeHighlightBackground": "#FFFFFF0d",
        "editorWhitespace.foreground": "#babed840",
        "editorWidget.background": "#1B1E2B",
        "editorHoverWidget.background": "#292D3E",
        "editorMarkerNavigation.background": "#babed805",
        "peekView.border": "#00000030",
        "peekViewEditor.background": "#333747",
        "peekViewResult.background": "#333747",
        "peekViewTitle.background": "#333747",
        "panel.background": "#1B1E2B",
        "panel.border": "#424A6C60",
        "panelTitle.activeBorder": "#80CBC4",
        "panelTitle.inactiveForeground": "#babed8",
        "notebook.focusedCellBorder": "#80CBC4",
        "notebook.inactiveFocusedCellBorder": "#80CBC450",
        "statusBar.background": "#1B1E2B",
        "statusBar.debuggingBackground": "#C792EA",
        "statusBar.debuggingForeground": "#ffffff",
        "statusBar.noFolderBackground": "#292D3E",
        "statusBarItem.activeBackground": "#f0717880",
        "statusBarItem.hoverBackground": "#676E9520",
        "statusBarItem.remoteBackground": "#80CBC4",
        "statusBarItem.remoteForeground": "#000000",
        "titleBar.activeBackground": "#1B1E2B",
        "pickerGroup.border": "#FFFFFF1a",
        "terminal.ansiBlack": "#000000",
        "terminal.ansiBlue": "#82AAFF",
        "terminal.ansiBrightBlack": "#676E95",
        "terminal.ansiBrightBlue": "#82AAFF",
        "terminal.ansiBrightCyan": "#89DDFF",
        "terminal.ansiBrightGreen": "#C3E88D",
        "terminal.ansiBrightMagenta": "#C792EA",
        "terminal.ansiBrightRed": "#f07178",
        "terminal.ansiBrightWhite": "#ffffff",
        "terminal.ansiBrightYellow": "#FFCB6B",
        "terminal.ansiCyan": "#89DDFF",
        "terminal.ansiGreen": "#C3E88D",
        "terminal.ansiMagenta": "#C792EA",
        "terminal.ansiRed": "#f07178",
        "terminal.ansiWhite": "#ffffff",
        "terminal.ansiYellow": "#FFCB6B",
        "debugToolBar.background": "#292D3E",
        "debugConsole.errorForeground": "#f07178",
        "debugConsole.infoForeground": "#89DDFF",
        "debugConsole.warningForeground": "#FFCB6B",
        "selection.background": "#00000080",
        "editorRuler.foreground": "#4E5579",
        "widget.shadow": "#00000030",
        "scrollbar.shadow": "#00000030",
        "editorLink.activeForeground": "#babed8",
        "progressBar.background": "#80CBC4",
        "pickerGroup.foreground": "#80CBC4",
        "tree.indentGuidesStroke": "#4E5579",
        "terminalCursor.foreground": "#FFCB6B",
        "terminalCursor.background": "#000000",
        "inputOption.activeBackground": "#babed830",
        "textLink.foreground": "#80CBC4",
        "textLink.activeForeground": "#babed8",
        "sideBar.foreground": "#757CA1",
        "sideBar.border": "#424A6C60",
        "sideBarTitle.foreground": "#babed8",
        "sideBarSectionHeader.border": "#424A6C60",
        "panel.dropBackground": "#babed8",
        "sash.hoverBorder": "#80CBC450",
        "panelTitle.activeForeground": "#FFFFFF",
        "editor.lineHighlightBackground": "#00000050",
        "editor.findMatchBackground": "#000000",
        "editor.findMatchHighlightBackground": "#00000050",
        "editor.findMatchBorder": "#80CBC4",
        "editor.findMatchHighlightBorder": "#ffffff50",
        "editorIndentGuide.background": "#4E557970",
        "editorIndentGuide.activeBackground": "#4E5579",
        "editorGroup.border": "#00000030",
        "editorGutter.modifiedBackground": "#82AAFF60",
        "editorGutter.addedBackground": "#C3E88D60",
        "editorGutter.deletedBackground": "#f0717860",
        "activityBar.border": "#424A6C60",
        "activityBar.foreground": "#babed8",
        "activityBar.activeBorder": "#80CBC4",
        "extensionBadge.remoteForeground": "#babed8",
        "scrollbarSlider.background": "#A6ACCD20",
        "scrollbarSlider.hoverBackground": "#A6ACCD10",
        "scrollbarSlider.activeBackground": "#80CBC4",
        "tab.unfocusedActiveBorder": "#676E95",
        "tab.activeForeground": "#FFFFFF",
        "tab.inactiveForeground": "#757CA1",
        "tab.activeBackground": "#292D3E",
        "tab.unfocusedActiveForeground": "#babed8",
        "editorWidget.resizeBorder": "#80CBC4",
        "editorWidget.border": "#80CBC4",
        "statusBar.border": "#424A6C60",
        "statusBar.foreground": "#676E95",
        "editorBracketMatch.border": "#FFCC0050",
        "editorBracketMatch.background": "#292D3E",
        "editorOverviewRuler.findMatchForeground": "#80CBC4",
        "editorOverviewRuler.border": "#292D3E",
        "editorOverviewRuler.errorForeground": "#f0717840",
        "editorOverviewRuler.infoForeground": "#82AAFF40",
        "editorOverviewRuler.warningForeground": "#FFCB6B40",
        "editorInfo.foreground": "#82AAFF70",
        "editorWarning.foreground": "#FFCB6B70",
        "editorError.foreground": "#f0717870",
        "editorHoverWidget.border": "#FFFFFF10",
        "titleBar.activeForeground": "#babed8",
        "titleBar.inactiveBackground": "#1B1E2B",
        "titleBar.inactiveForeground": "#757CA1",
        "titleBar.border": "#424A6C60",
        "input.foreground": "#babed8",
        "input.placeholderForeground": "#babed860",
        "input.border": "#FFFFFF10",
        "inputValidation.errorBorder": "#f07178",
        "inputValidation.infoBorder": "#82AAFF",
        "inputValidation.warningBorder": "#FFCB6B",
        "dropdown.border": "#FFFFFF10",
        "quickInput.background": "#292D3E",
        "quickInput.foreground": "#757CA1",
        "list.hoverForeground": "#FFFFFF",
        "list.inactiveSelectionForeground": "#80CBC4",
        "quickInput.list.focusBackground": "#babed820",
        "editorSuggestWidget.background": "#292D3E",
        "editorSuggestWidget.foreground": "#babed8",
        "editorSuggestWidget.highlightForeground": "#80CBC4",
        "editorSuggestWidget.selectedBackground": "#00000050",
        "editorSuggestWidget.border": "#FFFFFF10",
        "diffEditor.insertedTextBackground": "#89DDFF20",
        "diffEditor.removedTextBackground": "#ff9cac20",
        "notifications.background": "#292D3E",
        "notifications.foreground": "#babed8",
        "notificationLink.foreground": "#80CBC4",
        "extensionButton.prominentBackground": "#C3E88D90",
        "extensionButton.prominentHoverBackground": "#C3E88D",
        "extensionButton.prominentForeground": "#babed8",
        "peekViewEditorGutter.background": "#333747",
        "peekViewTitleDescription.foreground": "#babed860",
        "peekViewResult.matchHighlightBackground": "#717CB450",
        "peekViewEditor.matchHighlightBackground": "#717CB450",
        "peekViewResult.selectionBackground": "#757CA170",
        "gitDecoration.deletedResourceForeground": "#f0717890",
        "gitDecoration.conflictingResourceForeground": "#FFCB6B90",
        "gitDecoration.modifiedResourceForeground": "#82AAFF90",
        "gitDecoration.untrackedResourceForeground": "#C3E88D90",
        "gitDecoration.ignoredResourceForeground": "#757CA190",
        "breadcrumb.background": "#292D3E",
        "breadcrumb.foreground": "#757CA1",
        "breadcrumb.focusForeground": "#babed8",
        "breadcrumb.activeSelectionForeground": "#80CBC4",
        "breadcrumbPicker.background": "#1B1E2B",
        "menu.background": "#292D3E",
        "menu.foreground": "#babed8",
        "menu.selectionBackground": "#00000050",
        "menu.selectionForeground": "#80CBC4",
        "menu.selectionBorder": "#00000030",
        "menu.separatorBackground": "#babed8",
        "menubar.selectionBackground": "#00000030",
        "menubar.selectionForeground": "#80CBC4",
        "menubar.selectionBorder": "#00000030",
        "settings.dropdownForeground": "#babed8",
        "settings.dropdownBackground": "#1B1E2B",
        "settings.numberInputForeground": "#babed8",
        "settings.numberInputBackground": "#1B1E2B",
        "settings.textInputForeground": "#babed8",
        "settings.textInputBackground": "#1B1E2B",
        "settings.headerForeground": "#80CBC4",
        "settings.modifiedItemIndicator": "#80CBC4",
        "settings.checkboxBackground": "#1B1E2B",
        "settings.checkboxForeground": "#babed8",
        "listFilterWidget.background": "#00000030",
        "listFilterWidget.outline": "#00000030",
        "listFilterWidget.noMatchesOutline": "#00000030"
    },
    "rules": [
        {
            "foreground": "#C3E88D",
            "token": "string"
        },
        {
            "foreground": "#89DDFF",
            "token": "punctuation"
        },
        {
            "foreground": "#89DDFF",
            "token": " constant.other.symbol"
        },
        {
            "foreground": "#babed8",
            "token": "constant.character.escape"
        },
        {
            "foreground": "#babed8",
            "token": " text.html constant.character.entity.named"
        },
        {
            "foreground": "#ff9cac",
            "token": "constant.language.boolean"
        },
        {
            "foreground": "#F78C6C",
            "token": "constant.numeric"
        },
        {
            "foreground": "#babed8",
            "token": "variable"
        },
        {
            "foreground": "#babed8",
            "token": " variable.parameter"
        },
        {
            "foreground": "#babed8",
            "token": " support.variable"
        },
        {
            "foreground": "#babed8",
            "token": " variable.language"
        },
        {
            "foreground": "#babed8",
            "token": " support.constant"
        },
        {
            "foreground": "#babed8",
            "token": " meta.definition.variable entity.name.function"
        },
        {
            "foreground": "#babed8",
            "token": " meta.function-call.arguments"
        },
        {
            "foreground": "#F78C6C",
            "token": "keyword.other"
        },
        {
            "foreground": "#89DDFF",
            "token": "keyword"
        },
        {
            "foreground": "#89DDFF",
            "token": " modifier"
        },
        {
            "foreground": "#89DDFF",
            "token": " variable.language.this"
        },
        {
            "foreground": "#89DDFF",
            "token": " support.type.object"
        },
        {
            "foreground": "#89DDFF",
            "token": " constant.language"
        },
        {
            "foreground": "#82AAFF",
            "token": "entity.name.function"
        },
        {
            "foreground": "#82AAFF",
            "token": " support.function"
        },
        {
            "foreground": "#C792EA",
            "token": "storage.type"
        },
        {
            "foreground": "#C792EA",
            "token": " storage.modifier"
        },
        {
            "foreground": "#C792EA",
            "token": " storage.control"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "italic",
            "token": "support.module"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "italic",
            "token": " support.node"
        },
        {
            "foreground": "#FFCB6B",
            "token": "support.type"
        },
        {
            "foreground": "#FFCB6B",
            "token": " constant.other.key"
        },
        {
            "foreground": "#FFCB6B",
            "token": "entity.name.type"
        },
        {
            "foreground": "#FFCB6B",
            "token": " entity.other.inherited-class"
        },
        {
            "foreground": "#FFCB6B",
            "token": " entity.other"
        },
        {
            "foreground": "#676E95",
            "fontStyle": "italic",
            "token": "comment"
        },
        {
            "foreground": "#676E95",
            "fontStyle": "italic",
            "token": "comment punctuation.definition.comment"
        },
        {
            "foreground": "#676E95",
            "fontStyle": "italic",
            "token": " string.quoted.docstring"
        },
        {
            "foreground": "#89DDFF",
            "token": "punctuation"
        },
        {
            "foreground": "#FFCB6B",
            "token": "entity.name"
        },
        {
            "foreground": "#FFCB6B",
            "token": " entity.name.type.class"
        },
        {
            "foreground": "#FFCB6B",
            "token": " support.type"
        },
        {
            "foreground": "#FFCB6B",
            "token": " support.class"
        },
        {
            "foreground": "#FFCB6B",
            "token": " meta.use"
        },
        {
            "foreground": "#f07178",
            "token": "variable.object.property"
        },
        {
            "foreground": "#f07178",
            "token": " meta.field.declaration entity.name.function"
        },
        {
            "foreground": "#f07178",
            "token": "meta.definition.method entity.name.function"
        },
        {
            "foreground": "#82AAFF",
            "token": "meta.function entity.name.function"
        },
        {
            "foreground": "#89DDFF",
            "token": "template.expression.begin"
        },
        {
            "foreground": "#89DDFF",
            "token": " template.expression.end"
        },
        {
            "foreground": "#89DDFF",
            "token": " punctuation.definition.template-expression.begin"
        },
        {
            "foreground": "#89DDFF",
            "token": " punctuation.definition.template-expression.end"
        },
        {
            "foreground": "#babed8",
            "token": "meta.embedded"
        },
        {
            "foreground": "#babed8",
            "token": " source.groovy.embedded"
        },
        {
            "foreground": "#babed8",
            "token": " meta.template.expression"
        },
        {
            "foreground": "#f07178",
            "token": "entity.name.tag.yaml"
        },
        {
            "foreground": "#f07178",
            "token": "meta.object-literal.key"
        },
        {
            "foreground": "#f07178",
            "token": " meta.object-literal.key string"
        },
        {
            "foreground": "#f07178",
            "token": " support.type.property-name.json"
        },
        {
            "foreground": "#89DDFF",
            "token": "constant.language.json"
        },
        {
            "foreground": "#FFCB6B",
            "token": "entity.other.attribute-name.class"
        },
        {
            "foreground": "#F78C6C",
            "token": "entity.other.attribute-name.id"
        },
        {
            "foreground": "#FFCB6B",
            "token": "source.css entity.name.tag"
        },
        {
            "foreground": "#B2CCD6",
            "token": "support.type.property-name.css"
        },
        {
            "foreground": "#89DDFF",
            "token": "meta.tag"
        },
        {
            "foreground": "#89DDFF",
            "token": " punctuation.definition.tag"
        },
        {
            "foreground": "#f07178",
            "token": "entity.name.tag"
        },
        {
            "foreground": "#C792EA",
            "token": "entity.other.attribute-name"
        },
        {
            "foreground": "#babed8",
            "token": "punctuation.definition.entity.html"
        },
        {
            "foreground": "#89DDFF",
            "token": "markup.heading"
        },
        {
            "foreground": "#f07178",
            "token": "text.html.markdown meta.link.inline"
        },
        {
            "foreground": "#f07178",
            "token": " meta.link.reference"
        },
        {
            "foreground": "#89DDFF",
            "token": "text.html.markdown beginning.punctuation.definition.list"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "italic",
            "token": "markup.italic"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "bold",
            "token": "markup.bold"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "italic bold",
            "token": "markup.bold markup.italic"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "italic bold",
            "token": " markup.italic markup.bold"
        },
        {
            "foreground": "#C3E88D",
            "token": "markup.fenced_code.block.markdown punctuation.definition.markdown"
        },
        {
            "foreground": "#C3E88D",
            "token": "markup.inline.raw.string.markdown"
        },
        {
            "foreground": "#f07178",
            "token": "keyword.other.definition.ini"
        },
        {
            "foreground": "#89DDFF",
            "token": "entity.name.section.group-title.ini"
        },
        {
            "foreground": "#FFCB6B",
            "token": "source.cs meta.class.identifier storage.type"
        },
        {
            "foreground": "#f07178",
            "token": "source.cs meta.method.identifier entity.name.function"
        },
        {
            "foreground": "#82AAFF",
            "token": "source.cs meta.method-call meta.method"
        },
        {
            "foreground": "#82AAFF",
            "token": " source.cs entity.name.function"
        },
        {
            "foreground": "#FFCB6B",
            "token": "source.cs storage.type"
        },
        {
            "foreground": "#FFCB6B",
            "token": "source.cs meta.method.return-type"
        },
        {
            "foreground": "#676E95",
            "token": "source.cs meta.preprocessor"
        },
        {
            "foreground": "#babed8",
            "token": "source.cs entity.name.type.namespace"
        },
        {
            "foreground": "#babed8",
            "token": "meta.jsx.children"
        },
        {
            "foreground": "#babed8",
            "token": " SXNested"
        },
        {
            "foreground": "#FFCB6B",
            "token": "support.class.component"
        },
        {
            "foreground": "#babed8",
            "token": "source.cpp meta.block variable.other"
        },
        {
            "foreground": "#f07178",
            "token": "source.python meta.member.access.python"
        },
        {
            "foreground": "#82AAFF",
            "token": "source.python meta.function-call.python"
        },
        {
            "foreground": "#82AAFF",
            "token": " meta.function-call.arguments"
        },
        {
            "foreground": "#f07178",
            "token": "meta.block"
        },
        {
            "foreground": "#82AAFF",
            "token": "entity.name.function.call"
        },
        {
            "foreground": "#babed8",
            "token": "source.php support.other.namespace"
        },
        {
            "foreground": "#babed8",
            "token": " source.php meta.use support.class"
        },
        {
            "foreground": "#89DDFF",
            "fontStyle": "italic",
            "token": "constant.keyword"
        },
        {
            "foreground": "#82AAFF",
            "token": "entity.name.function"
        },
        {
            "foreground": "#f07178",
            "token": "constant.other.placeholder"
        },
        {
            "foreground": "#f07178",
            "token": "markup.deleted"
        },
        {
            "foreground": "#C3E88D",
            "token": "markup.inserted"
        },
        {
            "fontStyle": "underline",
            "token": "markup.underline"
        },
        {
            "foreground": "#89DDFF",
            "fontStyle": "italic",
            "token": "keyword.control"
        },
        {
            "fontStyle": "italic",
            "token": "variable.parameter"
        },
        {
            "foreground": "#f07178",
            "fontStyle": "italic",
            "token": "variable.parameter.function.language.special.self.python"
        },
        {
            "foreground": "#F78C6C",
            "token": "constant.character.format.placeholder.other.python"
        },
        {
            "fontStyle": "italic",
            "foreground": "#89DDFF",
            "token": "markup.quote"
        },
        {
            "foreground": "#babed890",
            "token": "markup.fenced_code.block"
        },
        {
            "foreground": "#ff9cac",
            "token": "punctuation.definition.quote"
        },
        {
            "foreground": "#C792EA",
            "token": "meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#FFCB6B",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#F78C6C",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#f07178",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#916b53",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#82AAFF",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#ff9cac",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#C792EA",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        },
        {
            "foreground": "#C3E88D",
            "token": "meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json meta.structure.dictionary.value.json meta.structure.dictionary.json support.type.property-name.json"
        }
    ],
    "encodedTokensColors": []
} as IStandaloneThemeData

export default PalenightHighContrast