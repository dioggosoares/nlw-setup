import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'
import dayjs from 'dayjs'
import { z } from 'zod'

import { prisma } from "./lib/prisma"

const publicKey = 'BNAmoyIxymDpc9m04d7Y-dgCE5NWpC26saZ1gl73p9R1r4Y2MB2Nof7lK_20k9JnNwlZnhXanFDtHp0F7UCNNEk'
const privateKey = 'NnNeBLUqJVv39q4koho1VG5-LQ_2ADH88Va5ZbKn3NM'

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance) {
  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  app.post('/push/register', (req, rep) => {
    return rep.status(201).send()
  })

  app.post('/push/send', (req, rep) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        })
      })
    })

    const { subscription } = sendPushBody.parse(req.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'Olá, você já praticou seus hábitos hoje?')
    }, 5000) // 14 horas

    return rep.status(201).send()
  })
}
