const RecursionPlugin = {
    install(editor) {
        editor.on("connectioncreate", (c) => {
            const recurrectNode = RecursionPlugin.detect(c);

            if (recurrectNode) {
                return false;
            }
        });
    },
    findSelf(node, inputNodes) {
        if (inputNodes.some((n) => n === node)) return true;

        for (var i = 0; i < inputNodes.length; i++) {
            if (this.findSelf(node, this.extractInputNodes(inputNodes[i])))
                return true;
        }

        return false;
    },
    extractInputNodes(node) {
        return node
            .getConnections()
            .filter((c) => c.input.node === node)
            .map((c) => c.output.node);
    },
    detect(inboundСonnection) {
        const { input, output } = inboundСonnection;

        return (
            input.node === output.node ||
            this.findSelf(input.node, this.extractInputNodes(output.node))
        );
    },
};

export default RecursionPlugin;
