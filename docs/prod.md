# Mago: especificação dos sprites de produção

Esta pasta recebe a arte final. Nada aqui foi gerado a partir da prancha conceitual (`assets/reference/`).
Enquanto os PNGs não existirem, o jogo usa o mago vetorial antigo, sem erro.

## Formato de cada PNG
- Frame de **128 × 192 px**, exibido a 64 × 96 (2× para telas retina).
- Fundo **transparente**. Sem sombra no chão (o jogo desenha), sem VFX, sem texto nem moldura.
- **Colunas = frames** do ciclo. **Linhas = 8 direções**, nesta ordem fixa:

| linha | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| direção | N (costas) | NE | E | SE | S (frente) | SW | W | NW |

- **Pivô nos pés: pixel (64, 184)** de cada frame, igual em todos os frames, direções e estados.
- O PNG inteiro tem **largura = frames × 128** e **altura = 8 × 192 = 1536**. Qualquer outro tamanho é recusado e o console mostra o tamanho esperado.
- Luz vinda de cima à esquerda, contorno consistente, mesma proporção em todos os frames.

## Estados e frames
| arquivo | frames | tamanho do PNG | situação |
|---|---|---|---|
| `idle.png` | 6 | 768 × 1536 | 1ª entrega |
| `walk.png` | 8 | 1024 × 1536 | 1ª entrega |
| `run.png` | 8 | 1024 × 1536 | 1ª entrega (Shift) |
| `cast.png` | 8 | 1024 × 1536 | já ligado, falta a arte |
| `attack.png` | 6 | 768 × 1536 | já ligado, falta a arte |
| `hit.png` | 4 | 512 × 1536 | já ligado, falta a arte |
| `death.png` | 10 | 1280 × 1536 | já ligado, falta a arte |

Se a folha de um estado não existir, o jogo usa outra: run → walk → idle, e cast, attack e hit → idle. Death sem folha usa o desenho vetorial antigo.

Walk e run avançam pela **distância percorrida** (ciclo completo de 8 frames a cada 1,6 tile no walk e 2,4 no run), então o pé não desliza. Desenhe o ciclo com dois apoios, um pé em cada metade.

## Camadas modulares
Caminho: `<camada>/<variante>/<estado>.png`. Todas as camadas têm a mesma grade e o mesmo pivô, e se alinham quando sobrepostas.

| camada | variantes | observação |
|---|---|---|
| `body/base/` | `base` | pele, cabelo, botas, calça. **Obrigatória**: sem `body/base/idle.png` nenhum sprite é usado |
| `robe/` | `robe0` … `robe5` | mesmos ids de `ITEMS` do jogo, trocam ao equipar |
| `hat/default/` | `default` | chapéu |
| `wand/` | `wand0`, `wand1`, `wand2`, `wand3`, `wand4`, `wand5`, `venomwand`, `cinderstaff` | cajado/varinha equipado (ids de `ITEMS` do tipo wand) |

Ordem de desenho: body, robe, hat, wand. De costas (N, NE, NW) o wand vai **atrás** do corpo.
Camada ou variante ausente é simplesmente pulada.

## Efeitos mágicos
Ficam **fora** dos sprites: runas, aura, projétil, impacto e explosão continuam nos sistemas `fx`, `projs` e `parts` do jogo. Não pinte brilho de feitiço no personagem; só o orbe do cajado, que é parte do objeto.

## Como testar
- Abra o jogo com `?animdebug=1` para carregar as folhas numeradas de `assets/debug/mage_test/` (diagnóstico, **não é arte final**).
- **F3** mostra o overlay: caixa do frame, cruz vermelha no pivô, estado, direção e frame.
- Andar com **WASD/setas**, correr com **Shift**, lançar com **1**.
