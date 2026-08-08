(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed.');
    }

    class MineBlocks {
        constructor() {
            this.player = null;
        }

        getInfo() {
            return {
                id: 'mineblocks',
                name: 'MineBlocks',
                blocks: [
                    {
                        opcode: 'open',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'open MineBlocks'
                    },
                    {
                        opcode: 'close',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'close MineBlocks'
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

            await this.player.ruffle().load('MineBlocks.swf');
        }

        close() {
            if (this.player) {
                this.player.remove();
                this.player = null;
            }
        }
    }

    Scratch.extensions.register(new MineBlocks());
})(Scratch);
