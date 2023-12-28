let move_speed = 3;
let g = 0.5;

let bird = document.querySelector(".bird");

let birdProp = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && game_state != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => { e.remove(); });
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score:';
        score_val.innerHTML = '0';
        play();
    } else if (e.key == ' ' || e.key == 'mousedown') {
        bird_i = -7.6;
    }
});

function play() {
    let bird_i = 0;

    function move() {
        if (game_state != 'Play') {
            return;
        }

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_prop = element.getBoundingClientRect();
            birdProp = bird.getBoundingClientRect();

            if (pipe_sprite_prop.right <= 0) {
                element.remove();
            } else {
                if (birdProp.left < pipe_sprite_prop.left + pipe_sprite_prop.width &&
                    birdProp.left + birdProp.width > pipe_sprite_prop.left &&
                    birdProp.top < pipe_sprite_prop.top + pipe_sprite_prop.height &&
                    birdProp.top + birdProp.height > pipe_sprite_prop.top) {
                    game_state = 'End';
                    message.innerHTML = 'Press Enter to Restart Flappy Bird';
                    message.style.left = '10vw';
                    return;
                } else {
                    if (pipe_sprite_prop.right < birdProp.left &&
                        pipe_sprite_prop.right + move_speed >= birdProp.left &&
                        element.increase_score == '1') {
                        score_val.innerHTML = +score_val.innerHTML + 1;
                    }
                    element.style.left = pipe_sprite_prop.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move);
    }
    requestAnimationFrame(move);

    function gravity() {
        if (game_state != 'Play') return;
        bird_i = bird_i + g;
        document.addEventListener('keydown',(e) => {
            if (e.key == ' ' || e.key == 'Enter') {
                bird_i = -8;
            }
        });
        if (birdProp.top <= 0 || birdProp.bottom >= background.bottom) {
            game_state = 'End';
            message.innerHTML = 'Press Enter to Restart Flappy Bird 1';
            message.style.left = '25vw';
            return;
        }
        bird.style.top = birdProp.top + bird_i + 'px';
        birdProp = bird.getBoundingClientRect();
        requestAnimationFrame(gravity);
    }
    requestAnimationFrame(gravity);

    let pipe_seperation = 0;
    let pipe_gap = 35;

    function create_pipe() {
        if (game_state != 'Play') return;
        if (pipe_seperation > 115) {
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8;
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);

            let pipe_sprite = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(create_pipe);
    }
    requestAnimationFrame(create_pipe);
}

// Start the game
play();
