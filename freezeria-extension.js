(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed.');
    }

    class Freezeria {
        constructor() {
            this.player = null;
        }

        getInfo() {
            return {
                id: 'freezeria',
                name: "Papa's Freezeria",
                blocks: [
                    {
                        opcode: 'open',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'open Papa\\'s Freezeria'
                    },
                    {
                        opcode: 'close',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'close Papa\\'s Freezeria'
                    }
                ]
            };
        }

        async open() {
            if (this.player) return;

            if (!window.RufflePlayer) {
                const script = document.createElement('script');
                script.src = 'ruffle.js';

                await new Promise((resolve, reject) => {
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }

            const ruffle = window.RufflePlayer.newest();
            this.player = ruffle.createPlayer();

            this.player.style.width = '800px';
            this.player.style.height = '600px';

            document.body.appendChild(this.player);

            await this.player.ruffle().load('freezeria.swf');
        }

        close() {
            if (this.player) {
                this.player.remove();
                this.player = null;
            }
        }
    }

    Scratch.extensions.register(new Freezeria());
})(Scratch);