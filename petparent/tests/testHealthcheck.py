from django.test import TestCase


class PostTestCase(TestCase):

    def testHealthcheck(self):
        response = self.client.get('/healthcheck', follow=True)
        self.assertEqual(response.status_code, 200)
