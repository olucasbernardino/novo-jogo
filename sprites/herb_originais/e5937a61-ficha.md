# Jardineira dos Cogumelos (Mushroom Gardener) – ficha para o Claude

Classe jogável. Chibi, cabeça ≈ 1/3 da altura. Referência: referencia_v1.jpg (frente, 3/4, lado, costas).

## Silhueta
- Altura total ≈ 50 unidades (padrão do jogo); chapéu-cogumelo largo (≈ 1,6× a largura dos ombros) é o traço dominante.
- Ombros estreitos, calça bufante larga, botas grandes e arredondadas.

## Paleta (luz / base / sombra)
| Cor | Luz | Base | Sombra |
|---|---|---|---|
| Chapéu magenta | #FF6FD8 | #D9259E | #8A1468 |
| Chapéu laranja (redemoinhos) | #FFB25C | #FF7A1F | #B84A0E |
| Pintas brilhantes ciano | #C8FFFF | #5EF2F0 | #1FA9B8 |
| Pintas brilhantes lima | #E8FF9A | #A6F23A | #5E9E14 |
| Cabelo verde-azulado | #6FC9C2 | #2E8A8A | #165253 |
| Pele | #FFE2CF | #F5BFA0 | #C98670 |
| Colete lima | #CFE06A | #9DB531 | #5E7019 |
| Macacão musgo | #8FA35A | #5E7036 | #34401D |
| Camisa creme | #F4E6C8 | #D9C59C | #A08A63 |
| Botas/raízes | #A8774A | #6E4A2A | #3E2814 |
| Regador turquesa | #7FE0D6 | #2FA8A0 | #17625E |
| Orbe do regador | #FFB3FF | #E040FB | #8E1AA8 |

## Rosto
Olhos grandes e redondos com íris em espiral arco-íris; sobrancelhas finas verde-azuladas; nariz-pontinho; boca pequena sorridente; bochechas rosadas. Cabelo curto ondulado; sem barba.

## Roupa por camada
- body/base: pele, cabelo, camisa creme, macacão musgo com remendos psicodélicos, botas de raiz.
- robe: colete lima com bolsinhas de esporos + bandana paisley + cinto de corda com mini-cogumelos (balançam ao andar).
- hat/default: chapéu-cogumelo; aba ondula de leve no walk/run, lamelas arco-íris por baixo.
- wand: regador turquesa (troca pela arma equipada; o orbe sempre fica na ponta do bico).
- Ao andar: calça bufante e mini-cogumelos do cinto balançam com atraso de 1 frame.

## O que brilha (iluminam o mapa à noite)
- Pintas do chapéu: ciano e lima, pulsação lenta (~2 s), raio de luz pequeno.
- Orbe no bico do regador: magenta, brilho forte ao lançar magia.
- Íris em espiral: brilho fraco, giram devagar no idle (opcional).

## Magias (efeitos fora do sprite) e poses
1. Esporos sonolentos – mão livre "em círculo", regador "erguido".
2. Raízes que prendem – agachar, regador "batida" no chão.
3. Cogumelo-mina – mão livre "à frente", regador "estocada" (rega o chão).
4. Florescer (cura) – mão livre "aberta", regador "erguido", brilho do orbe no máximo.

## Animações
idle: chapéu sobe/desce 1 px, pintas pulsam. walk/run: pé de apoio em cada metade. attack: golpe com o regador. hit: chapéu inclina para trás. death: encolhe e vira um cogumelo no chão.
