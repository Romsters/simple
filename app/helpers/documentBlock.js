define(['localizationManager', 'constants'], function (localizationManager, constants) {
    return {
        getDocumentBlockContent: function(html) {
            var $output = $('<output>').html(html);
            var downloadText = localizationManager.getLocalizedText(constants.documents.downloadLocalizationKey);
            var $container = $output.find(constants.documents.containerSelector);
            var documentType = $container.attr(constants.documents.typeAttrName);
            var documentSizeValue = $container.attr(constants.documents.sizeAttrName);
            var documentSize = getSize(documentSizeValue);
            var downloadBtnText = downloadText + ' (' + documentSize + ')';
            var $downloadBtn = $output.find(constants.documents.downloadBtnSelector);
            $downloadBtn.text(downloadBtnText);
            var $typeIcon = $('<div class="icon-container"></div>');
            $typeIcon.append('<span class="document-type-text">' + documentType + '</span>');
            switch (documentType) {
                case constants.documents.types.zip: {
                    $typeIcon.addClass('icon-zip');
                    break;
                }
                default: {
                    $typeIcon.addClass('icon-file');
                    break;
                }
            }
            var $typeIconWrapper = $('<div class="document-icon"></div>');
            $typeIconWrapper.append($typeIcon);
            var $infoContainer = $container.find(constants.documents.infoSelector);
            $infoContainer.prepend($('<div class="separator"></div>'));
            $infoContainer.prepend($typeIconWrapper);
            var content = $output.children()[0];
            return content;
        }
    };

    function getSize(size) {
        if (!size) {
            return '0 MB';
        }
        return (size / 1048576).toFixed(2) +  ' MB';
    }
});