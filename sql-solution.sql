-- Answer #1
SELECT a.AGENT_CODE, a.AGENT_NAME, SUM(o.ORD_AMOUNT) AS total_order_amount
FROM agents a
JOIN orders o ON a.AGENT_CODE = o.AGENT_CODE
GROUP BY a.AGENT_CODE, a.AGENT_NAME
ORDER BY total_order_amount DESC
LIMIT 1;
​
-- Answer #2
SELECT c.CUST_CODE, c.CUST_NAME, SUM(o.ORD_AMOUNT) AS total_order_amount
FROM customer c
JOIN orders o ON c.CUST_CODE = o.CUST_CODE
GROUP BY c.CUST_CODE, c.CUST_NAME
HAVING total_order_amount > 5000.00;

-- Answer #3
SELECT o.AGENT_CODE, COUNT(*) AS total_orders
FROM orders o
WHERE YEAR(o.ORD_DATE) = 2008 AND MONTH(o.ORD_DATE) = 7
GROUP BY o.AGENT_CODE;


