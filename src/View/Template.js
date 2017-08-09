const template = `
    <main class="container">
            <section class="controls">
                <button class="controls__btn-start">Старт</button>
                <button class="controls__btn-pause">Пауза</button>
                <div class="controls__width">
                    <span>Ширина: </span>
                    <input class="controls__width-input" type="number" min="1" value={{width}} />
                </div>
                <div class="controls__height">
                    <span>Высота: </span>
                    <input class="controls__height-input" type="number" min="1" value={{height}} />
                </div>
            </section>
            <section class="field">
                <canvas class="field__canvas">
            </section>
    </main>
        `;
export default template;
